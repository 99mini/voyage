interface Env {
  NODE_ENV: string;
  PB_URL_APP: string;
  PB_URL_API: string;
}

const env: Env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PB_URL_APP: process.env.PB_URL_APP || '',
  PB_URL_API: process.env.PB_URL_API || '',
};

export default env;
