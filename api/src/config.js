const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'JWT_SECRET'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  authDisabled: process.env.AUTH_DISABLED === 'true',
};

module.exports = config;
