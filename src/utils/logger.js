const errorLog = function (str) {
  console.log('\x1b[31m', str);
};

// eslint-disable-next-line import/prefer-default-export
export const logger = {
  error: errorLog,
};
