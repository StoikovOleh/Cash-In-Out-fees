export const TRANSACTION_TYPES = {
  CASH_IN: 'cash_in',
  CASH_OUT: 'cash_out',
};

export const USER_TYPE = {
  NATURAL: 'natural',
  JURIDICAL: 'juridical',
};

export const SUPPORTED_TRANSACTION_TYPES = [
  TRANSACTION_TYPES.CASH_IN,
  TRANSACTION_TYPES.CASH_OUT,
];

export const SUPPORTED_USER_TYPES = [
  USER_TYPE.NATURAL,
  USER_TYPE.JURIDICAL,
];

export const INVALID_TRANSACTION_VALUE = 'invalid transaction';
