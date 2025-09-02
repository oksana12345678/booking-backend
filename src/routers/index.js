import { Router } from 'express';
import { booking } from './booking.js';
import { schedule } from './schedule.js';

const router = Router();

router.use('/booking', booking);
router.use('/schedule', schedule);

export default router;
