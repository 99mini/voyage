'use strict';

module.exports = {
  apps: [
    {
      name: 'server-rest',
      script: './dist/main.cjs',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
