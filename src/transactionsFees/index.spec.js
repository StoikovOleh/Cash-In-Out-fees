import { SUPPORTED_TRANSACTION_TYPES, SUPPORTED_USER_TYPES } from '../lib/constants';
import { TRANSACTIONS_MOCK } from '../lib/mocks';
import { logger } from '../utils/logger';
import getTransactionsFees from './index';

describe('transactions fees', () => {
  it('general test case', () => {
    expect(getTransactionsFees(TRANSACTIONS_MOCK)).toEqual([
      0.06, 0.9, 87, 3, 0.3, 0.3, 5, 0, 0,
    ]);
  });

  it('invalid transaction type', () => {
    const invalidTransactionTypes = [
      {
        date: '2016-01-10',
        user_id: 2,
        user_type: 'juridical',
        type: 'invalid',
        operation: { amount: 1000000.0, currency: 'EUR' },
      },
    ];

    expect(getTransactionsFees(invalidTransactionTypes)).toEqual(['invalid transaction']);
    expect(logger.error).toHaveBeenCalledWith(`transaction[0] should have one of following types: ${SUPPORTED_TRANSACTION_TYPES.join(
      ', ',
    )}`);
  });

  it('invalid user type', () => {
    const invalidTransactionTypes = [
      {
        date: '2016-01-10',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000000.0, currency: 'EUR' },
      },
      {
        date: '2016-01-10',
        user_id: 2,
        user_type: 'invalid',
        type: 'cash_out',
        operation: { amount: 1000000.0, currency: 'EUR' },
      },
    ];

    expect(getTransactionsFees(invalidTransactionTypes)).toEqual([3000, 'invalid transaction']);
    expect(logger.error).toHaveBeenCalledWith(`transaction[1] should have one of following user types: ${SUPPORTED_USER_TYPES.join(
      ', ',
    )}`);
  });
});
