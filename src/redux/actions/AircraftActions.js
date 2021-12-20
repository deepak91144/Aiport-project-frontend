import { AircraftConstants } from "../constants/AircraftConstants";
import {
  createAircraft,
  getAllAircraft,
} from "../../components/CommonApiCalls";
import Aircraft from "../../components/Aircraft";

export const addAircraftData = (aircraftDetails, token, userId) => {
  return async (dispatch) => {
    const response = await createAircraft(aircraftDetails, token, userId);
    // console.log(response);
    if (response) {
      dispatch({
        type: AircraftConstants.ADD_AIRCRAFT,
        payload: { pMessage: response.message, pStatus: response.status },
      });
    }
  };
};
export const aircraftFetchPending = () => {
  return { type: AircraftConstants.FETCH_AIRCRAFT_PENDING };
};
export const toggleAircraftFetchPending = () => {
  return { type: AircraftConstants.TOGGLE_FETCH_AIRCRAFT_PENDING };
};
export const fetchAircrafts = (userId, token, sort, offSet, limit) => {
  return async (dispatch) => {
    const response = await getAllAircraft(userId, token, sort, offSet, limit);
    // console.log(response);
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
  };
};
