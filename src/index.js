import fs from 'fs';
import { SUPPORTED_FILE_EXTENSIONS } from './lib/constants';
import getTransactionsFees from './transactionsFees';
import { logger } from './utils';

const main = async () => {
  if (process.argv.length > 2) {
    const filePath = process.argv[2];
    const fileExtension = filePath.split('.')[filePath.split('.').length - 1];

    if (!SUPPORTED_FILE_EXTENSIONS.includes(fileExtension)) {
      logger.error(`file type should be ${SUPPORTED_FILE_EXTENSIONS.join(',')}`);
      return;
    }

    try {
      const fileJSON = await fs.promises.readFile(filePath, 'binary');
      const transactionsArr = JSON.parse(fileJSON);

      const fees = getTransactionsFees(transactionsArr);

      fees.forEach((fee) => {
        console.log(fee.toFixed(2));
      });
    } catch (err) {
      logger.error(err);
    }
  } else {
    logger.error('you should type a file path as a parameter');
  }
};

main();
