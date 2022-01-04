import { isAuthenticated } from "../../components/auth/ApiCalling";
import createAirport, { getAllAirports } from "../../components/CommonApiCalls";
import { AirportConstant } from "../constants/AirportConstants";
import { AuthConstants } from "../constants/auth/AuthConstants";

export const airportFetchPending = () => {
  return { type: AirportConstant.FETCH_AIRPORT_PENDING };
};
export const toggleAirportFetchPending = () => {
  return { type: AirportConstant.TOGGLE_FETCH_AIRPORT_PENDING };
};

export const fetchAirport = (sort, page, limit) => {
  const { token } = isAuthenticated();
  const offSet = (page - 1) * limit;

  return async (dispatch) => {
    // api calling for fetching all airport
    const response = await getAllAirports(token, sort, offSet, limit);
    if (response.message === "invalid_token") {
      dispatch({ type: AuthConstants.INVALID_TOKEN });
    } else {
      dispatch({
        type: AirportConstant.FETCH_AIRPORT,
        payload: {
          airports: response.airports,
          totalRecord: response.totalRecord,
          message: response.message,
          status: response.status,
          allAirport: response.allAirport,
          TopFuelAvalableAirports: response.TopFuelAvalableAirports,
          TopFuelCapacityAirports: response.TopFuelCapacityAirports,
        },
      });
    }
  };
};
