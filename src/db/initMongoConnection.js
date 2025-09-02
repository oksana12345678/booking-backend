import mongoose from 'mongoose';

import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const url = env('MONGODB_URI');
    await mongoose.connect(`${url}`);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log('connect error', err);
    throw err;
  }
};
