import { Router } from 'express';
import {
  createBookingRequestController,
  getAllBookingsController,
  getBookedCalendarController,
} from '../controllers/booking.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';

export const booking = Router();

booking.post(
  '/',
  upload.single('photo'),
  ctrlWrapper(createBookingRequestController),
);

booking.get('/', ctrlWrapper(getAllBookingsController));

booking.get('/calendar', ctrlWrapper(getBookedCalendarController));
