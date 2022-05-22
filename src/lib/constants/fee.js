import { CURRENCIES } from './currencies';
import { USER_TYPE } from './transaction';

const FEE_PERCENTAGE = {
  [CURRENCIES.EUR]: {
    CASH_IN: 0.03,
    CASH_OUT: 0.3,
  },
};

export const CASH_IN_FEE = {
  [CURRENCIES.EUR]: {
    FEE_PERCENTAGE: FEE_PERCENTAGE[CURRENCIES.EUR].CASH_IN,
    MAX_FEE: 5,
  },
};

export const CASH_OUT_FEE = {
  [CURRENCIES.EUR]: {
    [USER_TYPE.NATURAL]: {
      FEE_PERCENTAGE: FEE_PERCENTAGE[CURRENCIES.EUR].CASH_OUT,
      CHARGE_FREE: 1000,
    },
    [USER_TYPE.JURIDICAL]: {
      FEE_PERCENTAGE: FEE_PERCENTAGE[CURRENCIES.EUR].CASH_OUT,
      MIN_FEE: 0.5,
    },
  },
};
