import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
};

if (!env.PORT) {
  throw new Error('PORT is not defined');
}
