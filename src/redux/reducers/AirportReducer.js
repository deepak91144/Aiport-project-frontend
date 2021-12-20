import { AirportConstant } from "../constants/AirportConstants";

const initialState = {
  airports: [],
  allAirport: [],
  TopFuelAvalableAirports: [],
  TopFuelCapacityAirports: [],
  totalRecord: 0,
  message: "",
  status: "",
  pending: false,
};

export const AirportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AirportConstant.FETCH_AIRPORT:
      return {
        ...state,
        airports: payload.airports,
        allAirport: payload.allAirport,
        TopFuelAvalableAirports: payload.TopFuelAvalableAirports,
        TopFuelCapacityAirports: payload.TopFuelCapacityAirports,
        totalRecord: payload.totalRecord,
        message: payload.message,
        status: payload.status,
        pending: false,
      };
    case AirportConstant.FETCH_AIRPORT_PENDING:
      return { ...state, pending: true };
    case AirportConstant.TOGGLE_FETCH_AIRPORT_PENDING:
      return { ...state, pending: false };
    case AirportConstant.ADD_AIRPORT:
      return {
        ...state,

        pending: false,
      };
    default:
      return state;
  }
};
