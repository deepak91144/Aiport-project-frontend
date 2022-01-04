import { useSelector } from "react-redux";
import Menu from "./Menu";

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
          <div className="row">
            <div className="col-md-7 customCardParent text-center">
              <h3>Latest 5 Fuel Transaction</h3>
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
            </div>
            <div className="col-md-4 offset-md-1 customCardParent secondPart">
              <div className="row mt-4 mb-4">
                <h3 className="text-center">Latest 5 Transactions</h3>
                {TransactionReducer.allTransactions.length > 0 &&
                  TransactionReducer.allTransactions
                    .slice(0, 5)
                    .map((data, index) => {
                      return (
                        <>
                          <div className="col-lg-6 mt-3 ">
                            <div className="customCard text-center">
                              <div className="card-header bg-dark text-white text-success h4">
                                {data.airportId !== null &&
                                  data.airportId.airportName}
                              </div>
                              <div className="card-body">
                                <h4 className="card-title text-primary">
                                  {data.transactionType} type
                                </h4>
                                <h4 className="card-text text-primary">
                                  {data.quantity} L
                                </h4>
                                <h4 className="text-primary">
                                  {new Date(data.createdAt).toLocaleString()}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7 customCardParent text-center">
              <h3>Latest 5 OUT Type Fuel Transaction</h3>
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
            </div>
            <div className="col-md-4 offset-md-1 customCardParent secondPart">
              <div className="row mt-4 mb-4">
                <h3 className="text-center">Latest 5 Out Type Transactions</h3>
                {latestOutTypeTransaction.length > 0 &&
                  latestOutTypeTransaction.slice(0, 5).map((data, index) => {
                    return (
                      <>
                        <div className="col-lg-6  mt-3">
                          <div className="customCard text-center">
                            <div className="card-header bg-dark text-white h4">
                              {data.airportId !== null &&
                                data.airportId.airportName}
                            </div>
                            <div className="card-body">
                              <h4 className="card-title text-primary">
                                {data.transactionType} type
                              </h4>
                              <h4 className="card-text text-primary">
                                {data.quantity} L
                              </h4>
                              <h4 className="text-primary">
                                {new Date(data.createdAt).toLocaleString()}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7 customCardParent text-center">
              <h3>Latest 5 IN Type Fuel Transaction</h3>
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
            </div>
            <div className="col-md-4 offset-md-1 customCardParent secondPart">
              <div className="row mt-4 mb-4">
                <h3 className="text-center">Latest 5 IN Type Transactions</h3>
                {latestInTypeTransaction.length > 0 &&
                  latestInTypeTransaction.slice(0, 5).map((data, index) => {
                    return (
                      <>
                        <div className="col-lg-6  mt-3">
                          <div className="customCard text-center">
                            <div className="card-header bg-dark text-white h4">
                              {data.airportId !== null &&
                                data.airportId.airportName}
                            </div>
                            <div className="card-body">
                              <h4 className="card-title text-primary">
                                {data.transactionType} type
                              </h4>
                              <h4 className="card-text text-primary">
                                {data.quantity} (liter)
                              </h4>
                              <h4 className="text-primary">
                                {new Date(data.createdAt).toLocaleString()}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="container  mt-5">
          <div className="row">
            <div className="col-md-7 customCardParent">
              <h3 className="text-center">
                {" "}
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
            </div>
            <div className="col-md-4 offset-md-1 customCardParent secondPart">
              <div className="row mt-4 mb-4">
                <h3 className="text-center">Top 5 Fuel Available Airports </h3>
                {AirportReducer.TopFuelAvalableAirports.length > 0 &&
                  AirportReducer.TopFuelAvalableAirports.slice(0, 5).map(
                    (data, index) => {
                      return (
                        <>
                          <div className="col-lg-6  mt-3">
                            <div className="customCard text-center">
                              <div className="card-header bg-dark text-white text-success h4">
                                {data.airportName}
                              </div>
                              <div className="card-body">
                                <h4 className="card-text text-primary">
                                  {data.fuelAvailable} (liter)
                                </h4>
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
        </div>
      </main>
    </>
  );
};
export default Dashboard;
