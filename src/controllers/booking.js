import {
  createBookingRequest,
  getAllBookings,
  getBookingByEmail,
} from '../services/booking.js';
import { getAllSchedules } from '../services/schedule.js';
import dayjs from 'dayjs';

export const createBookingRequestController = async (req, res) => {
  const { email } = req.body;

  const existingBookingByEmail = await getBookingByEmail(email);

  if (existingBookingByEmail) {
    return res.status(400).json({
      success: false,
      message: 'Booking with this email already exists',
    });
  }

  const booking = await createBookingRequest(req.body);

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
};

export const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await getAllBookings();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Get bookings error:', error);

    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні бронювань',
      error: error.message || error,
    });
  }
};

export const getBookedCalendarController = async (req, res) => {
  try {
    const booked = await getAllBookings();
    const scheduledDates = await getAllSchedules();

    const bookedSlots = booked.map((item) => ({
      date: dayjs(item.sessionDate).format('YYYY-MM-DD'),
      time: item.time,
      user: { name: item.name, email: item.email, phone: item.phone },
    }));

    const updatedSchedule = scheduledDates
      .map((schedule) => {
        const scheduleDate = dayjs(schedule.date).format('YYYY-MM-DD');

        const bookedForDate = bookedSlots.filter(
          (b) => b.date === scheduleDate,
        );

        const hoursWithStatus = schedule.time.map((hour) => {
          const bookedHour = bookedForDate.find((b) => b.time === hour);

          return bookedHour
            ? { hour, booked: true, user: bookedHour.user }
            : { hour, booked: false };
        });

        return {
          ...schedule._doc,
          time: hoursWithStatus,
        };
      })
      .filter((schedule) => schedule.time.some((t) => !t.booked)); 
    res.status(200).json({
      data: updatedSchedule,
    });
  } catch (error) {
    console.error('Error in getBookedCalendarController:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні даних календаря',
      error: error.message || error,
    });
  }
};
