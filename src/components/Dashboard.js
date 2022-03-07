import { useSelector } from "react-redux";
import Menu from "./Menu";
import { Paper } from "@mui/material";

import { Bar, Pie, yAxes, Doughnut, Line } from "react-chartjs-2";
const Dashboard = () => {
  const { TransactionReducer, AirportReducer } = useSelector((state) => state);
  const aN = AirportReducer.allAirport.map((data) => {
    return data.airportName;
  });
  const fuelAvailable = AirportReducer.allAirport.map((data) => {
    return data.fuelAvailable;
  });
  const fuelCapacity = AirportReducer.allAirport.map((data) => {
    return data.fuelCapacity;
  });

  const latestOutTypeTransaction = TransactionReducer.allTransactions.filter(
    (data) => {
      if (data.transactionType === "out") {
        return data;
      }
    }
  );
  const airportsInLatestOutTypeTransaction = latestOutTypeTransaction.map(
    (data) => {
      if (data.airportId) {
        return data.airportId.airportName;
      }
    }
  );
  const quantityInLatestOutTypeTransaction = latestOutTypeTransaction.map(
    (data) => {
      return data.quantity;
    }
  );
  const latestInTypeTransaction = TransactionReducer.allTransactions.filter(
    (data) => {
      if (data.transactionType === "in") {
        return data;
      }
    }
  );
  const airportsInLatestInTypeTransaction = latestInTypeTransaction.map(
    (data) => {
      if (data.airportId) {
        return data.airportId.airportName;
      }
    }
  );
  const quantityInLatestInTypeTransaction = latestInTypeTransaction.map(
    (data) => {
      return data.quantity;
    }
  );
  console.log(latestOutTypeTransaction);
  const bgColors = [
    "bg-primary",
    "bg-warning",
    "bg-success",
    "bg-danger",
    "bg-primary",
  ];
  const colors = ["red", "yellow", "green", "blue", "pink"];

  const airportsInTransactions = TransactionReducer.allTransactions.map(
    (data) => {
      if (data.airportId !== null) {
        return data.airportId.airportName;
      }
    }
  );

  const quantityInTransactions = TransactionReducer.allTransactions.map(
    (data) => {
      return data.quantity;
    }
  );

  return (
    <>
      <Menu />

      <main>
        <div className="container mt-5">
          <div className="row ">
            <div className="col-md-7     text-center">
              <Paper elevation={24}>
                <h3 className="p-4">Latest 5 Fuel Transaction</h3>
                <Bar
                  data={{
                    labels: airportsInTransactions.slice(0, 5),
                    datasets: [
                      {
                        label: "Transaction Quantity",
                        data: quantityInTransactions,
                        backgroundColor: "blue",
                      },
                    ],
                  }}
                />
              </Paper>
            </div>
            <div className="col-md-4 offset-md-1  secondPart">
              <Paper elevation={24}>
                <div className="row mt-4 mb-4 justify-content-center">
                  <div className="col-md-8 justify-content-center">
                    <h3 className="text-center">Latest 5 Transactions</h3>
                    <div
                      class="accordion accordion-flush  "
                      id="accordionFlushExample"
                    >
                      {TransactionReducer.allTransactions.length > 0 &&
                        TransactionReducer.allTransactions
                          .slice(0, 5)
                          .map((data, index) => {
                            return (
                              <>
                                <div class="accordion-item ">
                                  <h2
                                    class="accordion-header"
                                    id={`flush-headingOne` + index + 1}
                                  >
                                    <button
                                      class="accordion-button collapsed h5"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        `#flush-collapseOne` + index + 1
                                      }
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                      w-60
                                    >
                                      {data.airportId !== null &&
                                        data.airportId.airportName}
                                    </button>
                                  </h2>
                                  <div
                                    id={`flush-collapseOne` + index + 1}
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {data.transactionType}
                                        </span>
                                        Type transaction
                                      </h5>

                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {data.quantity}
                                        </span>
                                        Litre
                                      </h5>
                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {new Date(
                                            data.createdAt
                                          ).toLocaleString()}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7  text-center">
              <Paper elevation={24}>
                <h3 className="p-4">Latest 5 OUT Type Fuel Transaction</h3>
                <Line
                  data={{
                    labels: airportsInLatestOutTypeTransaction.slice(0, 5),
                    datasets: [
                      {
                        label: "Transaction Quantity",
                        data: quantityInLatestOutTypeTransaction,
                        backgroundColor: "blue",
                      },
                    ],
                  }}
                />
              </Paper>
            </div>
            <div className="col-md-4 offset-md-1  secondPart">
              <Paper elevation={24}>
                <h3 className="text-center p-4">
                  Latest 5 Out Type Transations
                </h3>
                <div className="row mt-4 mb-4 justify-content-center">
                  <div className="col-md-8 ">
                    <div
                      class="accordion accordion-flush  "
                      id="accordionFlushExample"
                    >
                      {latestOutTypeTransaction.length > 0 &&
                        latestOutTypeTransaction
                          .slice(0, 5)
                          .map((data, index) => {
                            return (
                              <>
                                <div class="accordion-item ">
                                  <h2
                                    class="accordion-header"
                                    id={`flush-headingOne` + index + 2}
                                  >
                                    <button
                                      class="accordion-button collapsed h6"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        `#flush-collapseOne` + index + 2
                                      }
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                      w-60
                                    >
                                      {data.airportId !== null &&
                                        data.airportId.airportName}
                                    </button>
                                  </h2>
                                  <div
                                    id={`flush-collapseOne` + index + 2}
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {data.transactionType}
                                        </span>
                                        Type transaction
                                      </h5>

                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {data.quantity}
                                        </span>
                                        Litre
                                      </h5>
                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {new Date(
                                            data.createdAt
                                          ).toLocaleString()}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7  text-center">
              <Paper elevation={24}>
                <h3 className="p-4">Latest 5 IN Type Fuel Transaction</h3>
                <Doughnut
                  width={50}
                  height={50}
                  data={{
                    labels: airportsInLatestInTypeTransaction.slice(0, 5),
                    datasets: [
                      {
                        label: "Transaction Quantity",
                        data: quantityInLatestInTypeTransaction,
                        backgroundColor: colors,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2,
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                          padding: 4,
                        },
                      },
                    },
                  }}
                />
              </Paper>
            </div>
            <div className="col-md-4 offset-md-1  secondPart">
              <Paper elevation={24}>
                <h3 className="text-center p-4">
                  Latest 5 IN Type Transactions
                </h3>
                <div className="row mt-4 mb-4 justify-content-center">
                  <div className="col-md-8">
                    <div
                      class="accordion accordion-flush  "
                      id="accordionFlushExample"
                    >
                      {latestInTypeTransaction.length > 0 &&
                        latestInTypeTransaction
                          .slice(0, 5)
                          .map((data, index) => {
                            return (
                              <>
                                <div class="accordion-item ">
                                  <h2
                                    class="accordion-header"
                                    id={`flush-headingOne` + index + 3}
                                  >
                                    <button
                                      class="accordion-button collapsed h6"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        `#flush-collapseOne` + index + 3
                                      }
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                      w-60
                                    >
                                      {data.airportId !== null &&
                                        data.airportId.airportName}
                                    </button>
                                  </h2>
                                  <div
                                    id={`flush-collapseOne` + index + 3}
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {data.transactionType}
                                        </span>
                                        Type transaction
                                      </h5>

                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {data.quantity}
                                        </span>
                                        Litre
                                      </h5>
                                      <h5 className="text-capitalize">
                                        <span className="text-primary fw-bolder text-capitalize m-2">
                                          {new Date(
                                            data.createdAt
                                          ).toLocaleString()}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <div className="container  mt-5">
          <div className="row">
            <div className="col-md-7 ">
              <Paper elevation={24}>
                <h3 className="text-center p-4">
                  Airport FuelCapacity And fuelAvailablity
                </h3>
                <Bar
                  data={{
                    labels: aN,
                    datasets: [
                      {
                        label: "Fuel Availabe",
                        data: fuelAvailable,
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
              </Paper>
            </div>
            <div className="col-md-4 offset-md-1  secondPart">
              <Paper elevation={24}>
                <h3 className="text-center pt-4">Top 5 Fuel Available</h3>
                <div className="row mt-4 mb-4 justify-content-center">
                  <div className="col-md-8">
                    <div
                      class="accordion accordion-flush  "
                      id="accordionFlushExample"
                    >
                      {AirportReducer.TopFuelAvalableAirports.length > 0 &&
                        AirportReducer.TopFuelAvalableAirports.slice(0, 5).map(
                          (data, index) => {
                            return (
                              <>
                                <div class="accordion-item ">
                                  <h2
                                    class="accordion-header"
                                    id={`flush-headingOne` + index + 4}
                                  >
                                    <button
                                      class="accordion-button collapsed h6"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        `#flush-collapseOne` + index + 4
                                      }
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                      w-60
                                    >
                                      {data.airportName}
                                    </button>
                                  </h2>
                                  <div
                                    id={`flush-collapseOne` + index + 4}
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <h5 className="text-primary">
                                        {data.fuelAvailable} (liter)
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Dashboard;
