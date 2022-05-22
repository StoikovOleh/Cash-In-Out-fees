import {
  TRANSACTION_TYPES,
  SUPPORTED_TRANSACTION_TYPES,
  SUPPORTED_USER_TYPES,
  INVALID_TRANSACTION_VALUE,
} from '../lib/constants';
import { logger } from '../utils';
import getCashInFee from './cashIn';
import getCashOutFee from './cashOut';

const getTransactionsFees = (transactions) => {
  if (Array.isArray(transactions)) {
    return transactions.map((transaction, index) => {
      if (
        !transaction.type
        || !SUPPORTED_TRANSACTION_TYPES.includes(transaction.type)
      ) {
        logger.error(
          `transaction[${index}] should have one of following types: ${SUPPORTED_TRANSACTION_TYPES.join(
            ', ',
          )}`,
        );

        return INVALID_TRANSACTION_VALUE;
      }

      if (
        !transaction.user_type
        || !SUPPORTED_USER_TYPES.includes(transaction.user_type)
      ) {
        logger.error(
          `transaction[${index}] should have one of following user types: ${SUPPORTED_USER_TYPES.join(
            ', ',
          )}`,
        );
        return INVALID_TRANSACTION_VALUE;
      }

      const userOtherTransactions = transactions.filter((item, itemIndex) => index !== itemIndex
        && item.user_id === transaction.user_id
        && item.type === TRANSACTION_TYPES.CASH_OUT);

      switch (transaction.type) {
        case TRANSACTION_TYPES.CASH_IN:
          return getCashInFee(transaction);
        case TRANSACTION_TYPES.CASH_OUT:

          return getCashOutFee(transaction, userOtherTransactions);
        default:
          logger.error(`no transaction handler for ${transaction.type} type`);
          return INVALID_TRANSACTION_VALUE;
      }
    });
  }
  logger.error('should be array of transactions objects');
  return undefined;
};

export default getTransactionsFees;
