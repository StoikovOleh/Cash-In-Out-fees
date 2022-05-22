import getCashInFee from './cashIn';

const TRANSACTION_MOCK = {
  date: '2022-05-10',
  user_id: 2,
  user_type: 'juridical',
  type: 'cash_in',
  operation: { amount: 1000000.0, currency: 'EUR' },
};

describe('cash in', () => {
  it('invalid transaction currency', () => {
    expect(getCashInFee({
      ...TRANSACTION_MOCK,
      operation: { amount: 1000000.0, currency: 'invalid' },
    })).toEqual('invalid transaction');
  });

  it('invalid transaction amount', () => {
    expect(getCashInFee({
      ...TRANSACTION_MOCK,
      operation: { amount: 0, currency: 'EUR' },
    })).toEqual('invalid transaction');
  });

  it('simple transaction', () => {
    expect(getCashInFee({
      ...TRANSACTION_MOCK,
      operation: { amount: 16000, currency: 'EUR' },
    })).toEqual(4.8);
  });

  it('max fee', () => {
    expect(getCashInFee({
      ...TRANSACTION_MOCK,
      operation: { amount: 50000.0, currency: 'EUR' },
    })).toEqual(5);
  });
});
