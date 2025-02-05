import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.ts',
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                decorators: true,
              },
              target: 'es2020',
              transform: {
                decoratorMetadata: true,
              },
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@nestjs/microservices': false,
      '@nestjs/websockets': false,
      '@nestjs/platform-socket.io': false,
      'cache-manager': false,
      'class-transformer': false,
      'class-validator': false,
    },
  },
  output: {
    filename: 'main.cjs',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
  },
  externals: [
    function({ request }, callback) {
      if (/^@nestjs\/(common|core|platform-express)$/.test(request)) {
        return callback(null, false); // 번들에 포함
      }
      if (/^express$/.test(request)) {
        return callback(null, false); // 번들에 포함
      }
      if (/^(path|fs|http|https|crypto|util|events|stream|url|querystring|buffer|string_decoder|timers|zlib|tty|os|assert|constants)$/.test(request)) {
        return callback(null, 'commonjs ' + request); // Node.js 내장 모듈은 제외
      }
      callback(); // 그 외는 번들에 포함
    }
  ],
};
