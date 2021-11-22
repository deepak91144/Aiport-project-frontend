import { AircraftReducer } from "./AircraftReducer";
import { AirportReducer } from "./AirportReducer";
import { TransactionReducer } from "./Transactionducer";
import { FUelConsumptionReducer } from "./FuelConsumptionReducer";
import { combineReducers } from "redux";
import { AuthReducer } from "./auth/AuthReducer";

const rootReducer = combineReducers({
  AircraftReducer,
  AirportReducer,
  TransactionReducer,
  FUelConsumptionReducer,
  AuthReducer,
});
export default rootReducer;
