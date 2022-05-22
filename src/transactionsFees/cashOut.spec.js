import getCashOutFee from './cashOut';

const TRANSACTION_MOCK = {
  date: '2022-05-10',
  user_id: 2,
  user_type: 'juridical',
  type: 'cash_out',
  operation: { amount: 1000000.0, currency: 'EUR' },
};

describe('cash in', () => {
  it('invalid transaction currency', () => {
    expect(getCashOutFee({
      ...TRANSACTION_MOCK,
      operation: { amount: 1000000.0, currency: 'invalid' },
    })).toEqual('invalid transaction');
  });

  it('invalid transaction amount', () => {
    expect(getCashOutFee({
      ...TRANSACTION_MOCK,
      operation: { amount: 0, currency: 'EUR' },
    })).toEqual('invalid transaction');
  });

  describe('natural person', () => {
    it('without fee', () => {
      expect(getCashOutFee({
        ...TRANSACTION_MOCK,
        user_type: 'natural',
        operation: { amount: 999, currency: 'EUR' },
      }, [])).toEqual(0);
    });

    it('with fee', () => {
      expect(getCashOutFee({
        ...TRANSACTION_MOCK,
        user_type: 'natural',
        operation: { amount: 1100, currency: 'EUR' },
      }, [])).toEqual(0.3);
    });

    it('total cash out amount exceeded in previews transaction', () => {
      const OTHER_TRANSACTIONS = [{
        date: '2022-05-10',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000.0, currency: 'EUR' },
      }];

      const CURRENT_TRANSACTION = {
        date: '2022-05-10',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
      };

      expect(getCashOutFee(CURRENT_TRANSACTION, OTHER_TRANSACTIONS)).toEqual(0.3);
    });

    it('previews transaction at the end of the previews weel', () => {
      const OTHER_TRANSACTIONS = [{
        date: '2022-05-8',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000.0, currency: 'EUR' },
      }];

      const CURRENT_TRANSACTION = {
        date: '2022-05-10',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
      };

      expect(getCashOutFee(CURRENT_TRANSACTION, OTHER_TRANSACTIONS)).toEqual(0);
    });
  });

  describe('legal person', () => {
    it('min fee', () => {
      expect(getCashOutFee({
        ...TRANSACTION_MOCK,
        user_type: 'juridical',
        operation: { amount: 10, currency: 'EUR' },
      }, [])).toEqual(0.5);
    });

    it('regular fee', () => {
      expect(getCashOutFee({
        ...TRANSACTION_MOCK,
        user_type: 'juridical',
        operation: { amount: 1000, currency: 'EUR' },
      }, [])).toEqual(3);
    });
  });
});
