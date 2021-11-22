import { isAuthenticated } from "../../components/auth/ApiCalling";
import createAirport, { getAllAirports } from "../../components/CommonApiCalls";
import { AirportConstant } from "../constants/AirportConstants";

export const addAirportData = (airportDetails, token, userId) => {
  return async (dispatch) => {
    const response = await createAirport(airportDetails, token, userId);
    console.log(response);
    dispatch({
      type: AirportConstant.ADD_AIRPORT,
      payload: { pMessage: response.message, pStatus: response.status },
    });
  };
};

export const fetchAirport = (sort, page, limit) => {
  const { user, token } = isAuthenticated();
  const offSet = (page - 1) * limit;
  // if user is not exist make userId variable to blank else store user id to that variable
  var userId = "";
  if (!user) {
    userId = "";
  } else {
    userId = user._id;
  }

  return async (dispatch) => {
    // api calling for fetching all airport
    const response = await getAllAirports(token, userId, sort, offSet, limit);
    // console.log(response);
    dispatch({
      type: AirportConstant.FETCH_AIRPORT,
      payload: {
        airports: response.airports,
        totalRecord: response.totalRecord,
        message: response.message,
        status: response.status,
        allAirport: response.allAirport,
      },
    });
  };
};
