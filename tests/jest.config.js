import { join } from 'path';

export const collectCoverageFrom = [
  // '<rootDir>/server/database/**/*.[tj]s',
  '<rootDir>/server/routes/**/*.[tj]s',
];
export const moduleDirectories = ['node_modules'];
export const moduleFileExtensions = ['js'];
export const rootDir = join(__dirname, '../..');
// export const setupFiles = ['<rootDir>/server/config/jest.setup.js'];
export const setupFiles = ['<rootDir>/test/jest.setup.js'];
export const testEnvironment = 'node';
export const testMatch = [join(__dirname, '../../**/?(*.)+(spec|test).[tj]s')];
export const transform = {
  '^.+\\.[tj]s$': 'babel-jest',
};