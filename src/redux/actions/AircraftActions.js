import { AircraftConstants } from "../constants/AircraftConstants";

import {
  createAircraft,
  getAllAircraft,
} from "../../components/CommonApiCalls";
import Aircraft from "../../components/Aircraft";
import { AuthConstants } from "../constants/auth/AuthConstants";

export const aircraftFetchPending = () => {
  return { type: AircraftConstants.FETCH_AIRCRAFT_PENDING };
};
export const toggleAircraftFetchPending = () => {
  return { type: AircraftConstants.TOGGLE_FETCH_AIRCRAFT_PENDING };
};
export const fetchAircrafts = (token, sort, offSet, limit) => {
  return async (dispatch) => {
    const response = await getAllAircraft(token, sort, offSet, limit);

    if (response.message === "invalid_token") {
      dispatch({ type: AuthConstants.INVALID_TOKEN });
    } else {
      dispatch({
        type: AircraftConstants.FETCH_AIRCRAFT,
        payload: {
          aircraft: response.aircraft,
          allAircraft: response.allAircraft,
          message: response.message,
          status: response.status,
          totalRecord: response.totalRecord,
        },
      });
    }
  };
};
