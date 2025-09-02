import { Router } from 'express';
import {
  createBookingRequestController,
  getAllBookingsController,
  getBookedCalendarController,
} from '../controllers/booking.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const booking = Router();

booking.post('/', ctrlWrapper(createBookingRequestController));

booking.get('/', ctrlWrapper(getAllBookingsController));

booking.get('/calendar', ctrlWrapper(getBookedCalendarController));
