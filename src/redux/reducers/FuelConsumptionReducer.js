const {
  FuelConsumptionConstant,
} = require("../constants/FuelConsumptionConstants");

const initialState = {
  allTransactions: [],
  message: "",
  status: "",
  transactions: [],
};

export const FUelConsumptionReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FuelConsumptionConstant.FETCH_FUEL_TRANSACTIONS:
      return {
        ...state,
        allTransactions: payload.allTransactions,
        message: payload.message,
        status: payload.status,
        transactions: payload.transactions,
      };

    default:
      return state;
  }
};
