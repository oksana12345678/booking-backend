import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from './env.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

const saveFileToUploadDir = async (file) => {
  const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const uploadPath = path.join(UPLOAD_DIR, file.filename);


  await fs.rename(tempPath, uploadPath);
  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};

export default saveFileToUploadDir;
