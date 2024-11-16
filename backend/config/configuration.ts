export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10) || 3001,
  DATABASE_URI: process.env.DATABASE_URI
});