import { TransactionConstant } from "../constants/TransactionConstants";

const initialState = {
  transactions: [],
  message: "",
  status: "",
  totalRecord: 0,
  pMessage: "",
  pStatus: "",
};
export const TransactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TransactionConstant.FETCH_TRANSACTION:
      return {
        ...state,
        transactions: payload.transactions,
        message: payload.message,
        status: payload.status,
        totalRecord: payload.totalRecord,
      };
    case TransactionConstant.ADD_TRANSACTION:
      return { ...state, pMessage: payload.pMessage, pStatus: payload.pStatus };
    default:
      return state;
  }
};
