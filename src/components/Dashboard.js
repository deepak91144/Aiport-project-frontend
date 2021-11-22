import { useEffect, useState } from "react";
import { isAuthenticated, signout } from "./auth/ApiCalling";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Legend,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Area,
// } from "recharts";
import { Bar, Pie, yAxes, Doughnut } from "react-chartjs-2";

import Menu from "./Menu";

import { transactionsForFuelConsumptionReport } from "./CommonApiCalls";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchFuelTransaction } from "../redux/actions/FuelTransactionActions";
const Dashboard = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();
  const { user, token } = isAuthenticated();
  var userId = "";
  if (!user) {
    userId = "";
  } else {
    userId = user._id;
  }
  const { FUelConsumptionReducer, AircraftReducer } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const getTransactions = async (searchTerm) => {
    dispatch(fetchFuelTransaction(userId, token, searchTerm));
  };
  useEffect(() => {
    if (FUelConsumptionReducer.status !== "ok") {
      getTransactions("firstFetch");
    }
  }, []);
  const airportN = FUelConsumptionReducer.transactions.map((data) => {
    if (data.airportId) {
      return data.airportId.airportName;
    }
  });
  const airportId = FUelConsumptionReducer.transactions.map((data) => {
    if (data.airportId) {
      return data.airportId._id;
    }
  });
  const fuel = FUelConsumptionReducer.transactions.map((data) => {
    if (data.airportId) {
      return data.airportId.fuelAvailable;
    }
  });
  const fuelCapacity = FUelConsumptionReducer.transactions.map((data) => {
    if (data.airportId) {
      return data.airportId.fuelCapacity;
    }
  });
  const aircraft = FUelConsumptionReducer.transactions.map((data) => {
    if (data.aircraftId) {
      return data.aircraftId.airline;
    }
  });
  console.log(aircraft);
  const qty = FUelConsumptionReducer.transactions.map((data) => {
    return data.quantity;
  });
  const allAirportName = FUelConsumptionReducer.allTransactions.map((data) => {
    if (data.airportId) {
      return data.airportId.airportName;
    }
  });
  const allAirportId = FUelConsumptionReducer.allTransactions.map((data) => {
    if (data.airportId) {
      return data.airportId._id;
    }
  });

  function getDistinctFuel(value, index, self) {
    return self.indexOf(value) === index;
  }
  const distinctFuel = fuel.filter(getDistinctFuel);

  function getDistinctAirportName(value, index, self) {
    return self.indexOf(value) === index;
  }

  function getDistinctAirportId(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getAllDistinctAirportName(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getAllDistinctAirportId(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getAllDistinctAircraftName(value, index, self) {
    return self.indexOf(value) === index;
  }
  var distinctAirportName = airportN.filter(getDistinctAirportName);
  let distinctAirportId = airportId.filter(getDistinctAirportId);
  let allDistinctAirportName = allAirportName.filter(getAllDistinctAirportName);
  let allDistinctAirportId = allAirportId.filter(getAllDistinctAirportId);
  let allDistinctAirlineName = aircraft.filter(getAllDistinctAircraftName);
  let uniqueArlines = allDistinctAirlineName.filter((data) => {
    return data !== undefined;
  });
  const srachByAirport = async (e) => {
    const { value } = e.target;
    if (value === "all") {
      getTransactions("firstFetch");
    } else {
      getTransactions(value);
    }
  };

  return (
    <>
      <Menu />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-8">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1 className="text-success" style={{ fontWeight: "bolder" }}>
                Fuel Consumption Report
              </h1>

              <select
                style={{
                  borderRadius: "10px",
                  outline: "none",
                  borderColor: "red",
                }}
                onChange={srachByAirport}
              >
                <option disabled selected>
                  Filter By Airport
                </option>
                <option value="all">All</option>

                {allDistinctAirportName.length > 0 &&
                  allDistinctAirportName.map((airport, index) => {
                    return (
                      <option value={allDistinctAirportId[index]}>
                        {airport}
                      </option>
                    );
                  })}
              </select>
            </div>
            {distinctAirportName.slice(0, 3).map((data, index) => {
              return (
                <>
                  <p style={{ fontSize: "20px", color: "black" }}>
                    Airport Name:
                    <span style={{ fontSize: "20px", color: "red" }}>
                      {data}
                    </span>
                  </p>
                  <table className="table table-borderless">
                    <tr>
                      <th>Date/Time</th>
                      <th>Type</th>
                      <th>Fuel</th>
                      <th>Airline</th>
                    </tr>
                    {FUelConsumptionReducer.transactions.map((t, i) => {
                      if (t.airportId) {
                        if (t.airportId.airportName === data) {
                          return (
                            <>
                              <tr>
                                <td>
                                  {new Date(t.createdAt).toLocaleString()}
                                </td>
                                <td>{t.transactionType}</td>
                                <td>{t.quantity}</td>
                                <td>
                                  {t.aircraftId !== null ? (
                                    t.aircraftId.airline
                                  ) : (
                                    <div className="text-danger">
                                      Airline Not Available
                                    </div>
                                  )}
                                </td>
                              </tr>
                            </>
                          );
                        }
                      }
                    })}
                  </table>
                  <p>
                    <span style={{ fontWeight: "bolder" }}>Fuel Availabe</span>:
                    {distinctFuel[index]}
                  </p>
                </>
              );
            })}
          </div>

          <div className="col-md-4">
            <Doughnut
              data={{
                labels: uniqueArlines,
                datasets: [
                  {
                    label: "trnsaction",
                    data: qty.slice(0, 4),
                    backgroundColor: [
                      "green",
                      "red",
                      "blue",
                      "black",
                      "tomato",
                      "khaki",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>

      <Bar
        data={{
          labels: distinctAirportName,
          datasets: [
            {
              label: "trnsaction",
              data: qty,
              backgroundColor: "red",
            },
            {
              label: "Fuel Availabe",
              data: fuel,
              backgroundColor: "blue",
            },
            {
              label: "Fuel Capacity",
              data: fuelCapacity,
              backgroundColor: "green",
            },
          ],
        }}
      />
    </>
  );
};
export default Dashboard;
