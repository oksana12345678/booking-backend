import { model, Schema } from 'mongoose';

const ScheduleSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    time: { type: Array, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ScheduleModel = model('schedule', ScheduleSchema);
export default ScheduleModel;
