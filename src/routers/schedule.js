import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createScheduleController,
  getAllSchedulesController,
} from '../controllers/schedule.js';

export const schedule = Router();

schedule.post('/', ctrlWrapper(createScheduleController));

schedule.get('/', ctrlWrapper(getAllSchedulesController));
