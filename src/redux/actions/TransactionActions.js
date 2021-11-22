import {
  createTransaction,
  getAllTransaction,
} from "../../components/CommonApiCalls";
import { TransactionConstant } from "../constants/TransactionConstants";

export const addTransactionData = (transactionData, userId, token) => {
  return async (dispatch) => {
    const response = await createTransaction(transactionData, userId, token);
    dispatch({
      type: TransactionConstant.ADD_TRANSACTION,
      payload: { pMessage: response.message, pStatus: response.status },
    });
  };
};
export const fetchTransactions = (userId, token, sort, offSet, limit) => {
  return async (dispatch) => {
    const response = await getAllTransaction(
      userId,
      token,
      sort,
      offSet,
      limit
    );
    console.log(response);
    dispatch({
      type: TransactionConstant.FETCH_TRANSACTION,
      payload: {
        transactions: response.transactions,
        message: response.message,
        status: response.status,
        totalRecord: response.totalRecord,
      },
    });
  };
};