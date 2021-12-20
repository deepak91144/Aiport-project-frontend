import { AircraftConstants } from "../constants/AircraftConstants";

const initialState = {
  aircraft: [],
  allAircraft: [],
  message: "",
  status: "",
  totalRecord: 0,

  pending: false,
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
        pending: false,
      };
    case AircraftConstants.FETCH_AIRCRAFT_PENDING:
      return { ...state, pending: true };
    case AircraftConstants.TOGGLE_FETCH_AIRCRAFT_PENDING:
      return { ...state, pending: false };
    case AircraftConstants.ADD_AIRCRAFT:
      return {
        ...state,

        pending: false,
      };
    default:
      return state;
  }
};
