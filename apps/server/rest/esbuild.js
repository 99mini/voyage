import * as esbuild from 'esbuild';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔨 Building with esbuild...');

await esbuild.build({
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
    '@nestjs/microservices',
    '@nestjs/websockets',
    '@nestjs/platform-socket.io',
    'class-transformer',
    'class-validator',
  ],
});

console.log('✅ Build complete.');
