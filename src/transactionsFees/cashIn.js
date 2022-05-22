import {
  CASH_IN_FEE,
  SUPPORTED_CURRENCIES,
  INVALID_TRANSACTION_VALUE,
} from '../lib/constants';
import { getCurrencyPercentage } from '../utils';

const getCashInFee = (transaction) => {
  const isValidTransaction = transaction
    && transaction.operation
    && transaction.operation.amount
    && transaction.operation.currency;
  const currency = isValidTransaction && transaction.operation.currency.toLocaleUpperCase();
  const transactionAmount = isValidTransaction && transaction.operation.amount;
  const isSupportedCurrency = SUPPORTED_CURRENCIES.includes(currency) && typeof transactionAmount === 'number';

  if (isValidTransaction && isSupportedCurrency) {
    const { MAX_FEE } = CASH_IN_FEE[currency];
    const { FEE_PERCENTAGE } = CASH_IN_FEE[currency];

    const transactionFee = getCurrencyPercentage(transactionAmount, FEE_PERCENTAGE);

    return transactionFee > MAX_FEE ? MAX_FEE : transactionFee;
  }

  return INVALID_TRANSACTION_VALUE;
};

export default getCashInFee;
