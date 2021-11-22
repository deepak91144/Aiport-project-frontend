import { AircraftConstants } from "../constants/AircraftConstants";

const initialState = {
  aircraft: [],
  allAircraft: [],
  message: "",
  status: "",
  totalRecord: 0,
  pMessage: "",
  pStatus: "",
};
export const AircraftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AircraftConstants.FETCH_AIRCRAFT:
      return {
        ...state,
        aircraft: payload.aircraft,
        allAircraft: payload.allAircraft,
        status: payload.status,
        totalRecord: payload.totalRecord,
      };
    case AircraftConstants.ADD_AIRCRAFT:
      return { ...state, pMessage: payload.pMessage, pStatus: payload.pStatus };
    default:
      return state;
  }
};
