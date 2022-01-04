import {
  createTransaction,
  getAllTransaction,
} from "../../components/CommonApiCalls";
import { AuthConstants } from "../constants/auth/AuthConstants";
import { TransactionConstant } from "../constants/TransactionConstants";

export const transactionFetchPending = () => {
  return { type: TransactionConstant.FETCH_TRANSACTION_PENDING };
};
export const toggleTransactionFetchPending = () => {
  return { type: TransactionConstant.TOGGLE_FETCH_TRANSACTION_PENDING };
};
export const fetchTransactions = (token, sort, offSet, limit) => {
  return async (dispatch) => {
    const response = await getAllTransaction(token, sort, offSet, limit);
    if (response.message === "invalid_token") {
      dispatch({ type: AuthConstants.INVALID_TOKEN });
    } else {
      dispatch({
        type: TransactionConstant.FETCH_TRANSACTION,
        payload: {
          transactions: response.transactions,
          allTransactions: response.allTransactions,
          message: response.message,
          status: response.status,
          totalRecord: response.totalRecord,
        },
      });
    }
  };
};
