import { transactionsForFuelConsumptionReport } from "../../components/CommonApiCalls";
import { FuelConsumptionConstant } from "../constants/FuelConsumptionConstants";

export const fetchFuelTransaction = (userId, token, searchTerm) => {
  return async (dispatch) => {
    const response = await transactionsForFuelConsumptionReport(
      userId,
      token,
      searchTerm
    );
    console.log(response);
    dispatch({
      type: FuelConsumptionConstant.FETCH_FUEL_TRANSACTIONS,
      payload: {
        allTransactions: response.allTransactions,
        message: response.message,
        status: response.status,
        transactions: response.transactions,
      },
    });
  };
};
