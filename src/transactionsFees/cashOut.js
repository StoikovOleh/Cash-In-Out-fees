import {
  CASH_OUT_FEE,
  SUPPORTED_CURRENCIES,
  INVALID_TRANSACTION_VALUE,
} from '../lib/constants';
import { getAmountBefore, getCurrencyPercentage } from '../utils';

const getCashOutFee = (transaction, userOtherTransactions) => {
  const isValidTransaction = transaction
    && transaction.operation
    && transaction.operation.amount
    && transaction.operation.currency;
  const currency = isValidTransaction && transaction.operation.currency.toLocaleUpperCase();
  const transactionAmount = isValidTransaction && transaction.operation.amount;
  const isSupportedCurrency = SUPPORTED_CURRENCIES.includes(currency) && typeof transactionAmount === 'number';

  if (isValidTransaction && isSupportedCurrency) {
    const userType = transaction.user_type.toLocaleLowerCase();

    const { FEE_PERCENTAGE } = CASH_OUT_FEE[currency][userType];
    const { CHARGE_FREE } = CASH_OUT_FEE[currency][userType];
    const { MIN_FEE } = CASH_OUT_FEE[currency][userType];

    let transactionFee;

    if (CHARGE_FREE) {
      const amountBefore = getAmountBefore(transaction, userOtherTransactions);

      if (amountBefore > CHARGE_FREE) {
        transactionFee = getCurrencyPercentage(transactionAmount, FEE_PERCENTAGE);
      } else if (amountBefore + transactionAmount > CHARGE_FREE) {
        const sumOverLimit = amountBefore + transactionAmount - CHARGE_FREE;

        transactionFee = getCurrencyPercentage(sumOverLimit, FEE_PERCENTAGE);
      } else {
        transactionFee = 0;
      }
    } else {
      transactionFee = getCurrencyPercentage(transactionAmount, FEE_PERCENTAGE);
    }

    return MIN_FEE && transactionFee < MIN_FEE ? MIN_FEE : transactionFee;
  }

  return INVALID_TRANSACTION_VALUE;
};

export default getCashOutFee;
