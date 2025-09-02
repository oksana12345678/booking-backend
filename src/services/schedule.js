import ScheduleModel from '../db/models/schedule.js';

export const createSchedule = (data) => {
  return ScheduleModel.create(data);
};

export const getAllSchedules = () => {
  return ScheduleModel.find();
};


