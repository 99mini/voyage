import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(test|spce).[jt]s', '**/?(*.)+(spec|test).[jt]s'],
};

export default config;
