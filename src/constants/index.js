import path from 'node:path';

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
