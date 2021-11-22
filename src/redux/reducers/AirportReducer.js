import { AirportConstant } from "../constants/AirportConstants";

const initialState = {
  airports: [],
  allAirport: [],
  totalRecord: 0,
  message: "",
  status: "",
  pMessage: "",
  pStatus: "",
};

export const AirportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AirportConstant.FETCH_AIRPORT:
      return {
        ...state,
        airports: payload.airports,
        allAirport: payload.allAirport,
        totalRecord: payload.totalRecord,
        message: payload.message,
        status: payload.status,
      };
    case AirportConstant.ADD_AIRPORT:
      return { ...state, pMessage: payload.pMessage, pStatus: payload.pStatus };
    default:
      return state;
  }
};
