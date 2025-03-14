interface Env {
  NODE_ENV: string;
  BASE_URL: string;
}

const env: Env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  BASE_URL: process.env.BASE_URL || 'https://api.zerovoyage.com/v1',
};

export default env;
