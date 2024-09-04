module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // If you're using decorators, enable support for them:
    globals: {
      'ts-jest': {
        tsconfig: {
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        },
      },
    },
    // If you have non-TypeScript files that might need special processing
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };
  