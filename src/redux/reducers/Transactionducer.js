import { TransactionConstant } from "../constants/TransactionConstants";

const initialState = {
  transactions: [],
  allTransactions: [],
  message: "",
  status: "",
  totalRecord: 0,
};
export const TransactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TransactionConstant.FETCH_TRANSACTION:
      return {
        ...state,
        transactions: payload.transactions,
        allTransactions: payload.allTransactions,
        message: payload.message,
        status: payload.status,
        totalRecord: payload.totalRecord,
        pending: false,
      };
    case TransactionConstant.FETCH_TRANSACTION_PENDING:
      return { ...state, pending: true };
    case TransactionConstant.TOGGLE_FETCH_TRANSACTION_PENDING:
      return { ...state, pending: false };

    default:
      return state;
  }
};
