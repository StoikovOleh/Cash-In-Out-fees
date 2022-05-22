import isSameWeek from 'date-fns/isSameWeek';

// filtering same week transactions before the current and getting sum of them
export const getAmountBefore = (currentTransaction, otherTransactions) => otherTransactions.filter(
  (transaction) => transaction.date <= currentTransaction.date
    && isSameWeek(
      new Date(currentTransaction.date),
      new Date(transaction.date),
      { weekStartsOn: 1 },
    ),
).reduce((sum, transaction) => sum + transaction.operation.amount, 0);

export const getCurrencyPercentage = (amount, percentage) => {
  // Converting amount to coins for correct rounding
  const coinsAmount = amount * 100;
  const percentInCoins = (coinsAmount * percentage) / 100;
  const banknotesAmount = Math.ceil(percentInCoins) / 100;

  return banknotesAmount;
};
