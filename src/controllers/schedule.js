import { createSchedule, getAllSchedules } from '../services/schedule.js';

export const createScheduleController = async (req, res) => {
  try {
    const schedule = await createSchedule(req.body);

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: schedule,
    });
  } catch (error) {
    console.error('Create schedule error:', error);

    res.status(500).json({
      success: false,
      message: 'Помилка при створенні розкладу',
      error: error.message || error,
    });
  }
};

export const getAllSchedulesController = async (req, res) => {
  try {
    const schedules = await getAllSchedules();

    res.status(200).json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    console.error('Get schedules error:', error);

    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні розкладів',
      error: error.message || error,
    });
  }
};
