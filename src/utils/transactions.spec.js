import { getAmountBefore, getCurrencyPercentage } from './transactions';

const TRANSACTIONS_MOCK = [
  {
    date: '2022-05-06', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2022-05-07', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 1000.00, currency: 'EUR' },
  },
  {
    date: '2022-05-07', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 100.00, currency: 'EUR' },
  },
  {
    date: '2022-05-10', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 100.00, currency: 'EUR' },
  },
  {
    date: '2022-05-10', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 1000.00, currency: 'EUR' },
  },
];

describe('amount of transactions before', () => {
  it('empty arguments', () => {
    expect(getAmountBefore({}, [])).toBe(0);
  });

  it('several transactions per one day', () => {
    const transaction = {
      date: '2022-05-07', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 120.00, currency: 'EUR' },
    };

    expect(getAmountBefore(transaction, TRANSACTIONS_MOCK)).toBe(31100);
  });

  it('Sunday transaction', () => {
    const transaction = {
      date: '2022-05-08', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 120.00, currency: 'EUR' },
    };

    expect(getAmountBefore(transaction, TRANSACTIONS_MOCK)).toBe(31100);
  });

  it('Next week Monday transaction', () => {
    const transaction = {
      date: '2022-05-09', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 120.00, currency: 'EUR' },
    };

    expect(getAmountBefore(transaction, TRANSACTIONS_MOCK)).toBe(0);
  });
});

describe('currency percentage', () => {
  const PERCENTAGE = 0.3;

  it('correct ceil rounding', () => {
    expect((123 * PERCENTAGE) / 100).toBe(0.369);
    expect(getCurrencyPercentage(123, PERCENTAGE)).toBe(0.37);

    expect((121 * PERCENTAGE) / 100).toBe(0.363);
    expect(getCurrencyPercentage(121, PERCENTAGE)).toBe(0.37);
  });
});
