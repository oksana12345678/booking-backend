import { model, Schema } from 'mongoose';

const BookingSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
    photoSessions: {
      type: String,
      default: null,
    },
    sessionDate: {
      type: Date,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BookingModel = model('booking', BookingSchema);
export default BookingModel;
