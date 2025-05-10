import dotenv from 'dotenv';
import * as esbuild from 'esbuild';

dotenv.config();

console.log(`🔨 Building with esbuild...: ${process.env.NODE_ENV}`);

const result = await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/main.cjs',
  format: 'cjs',
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV !== 'production',
  define: {
    'process.env.DO_API_KEY': `"${process.env.DO_API_KEY}"`,
    'process.env.DO_FUNCTIONS_API_KEY': `"${process.env.DO_FUNCTIONS_API_KEY}"`,
    'process.env.DO_FUNCTIONS_API_ENDPOINT': `"${process.env.DO_FUNCTIONS_API_ENDPOINT}"`,
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.API_KEY': `"${process.env.API_KEY}"`,
    'process.env.SUPABASE_URL': `"${process.env.SUPABASE_URL}"`,
    'process.env.SUPABASE_ANON_KEY': `"${process.env.SUPABASE_ANON_KEY}"`,
    'process.env.SUPABASE_SERVICE_ROLE_KEY': `"${process.env.SUPABASE_SERVICE_ROLE_KEY}"`,
    'process.env.DATABASE_URL': `"${process.env.DATABASE_URL}"`,
    'process.env.ADMIN_USER': `"${process.env.ADMIN_USER}"`, // TODO: remove
    'process.env.ADMIN_PASSWORD': `"${process.env.ADMIN_PASSWORD}"`, // TODO: remove
  },
  external: [
    // Node.js 내장 모듈
    'path',
    'fs',
    'http',
    'https',
    'crypto',
    'util',
    'events',
    'stream',
    'url',
    'querystring',
    'buffer',
    'string_decoder',
    'timers',
    'zlib',
    'tty',
    'os',
    'assert',
    'constants',
    // NestJS 마이크로서비스 관련
    '@grpc/grpc-js',
    '@grpc/proto-loader',
    'amqplib',
    'amqp-connection-manager',
    'kafkajs',
    'mqtt',
    'nats',
    'ioredis',
    'class-transformer',
    'class-validator',
  ],
});

Object.entries(result).forEach(([key, value]) => {
  console.log(`${key}:`);
  console.log(JSON.stringify(value));
  console.log('----------------');
});

console.log('✅ esBuild complete.');
