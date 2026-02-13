import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',
};

if (!env.PORT) {
  throw new Error('PORT is not defined');
}

if (!env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY not set");
}

if (!env.GEMINI_MODEL) {
  console.warn("⚠️ GEMINI_MODEL not set");
}
