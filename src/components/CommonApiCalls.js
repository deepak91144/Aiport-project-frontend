const createAirport = (airportdata, token, userId) => {
  return fetch(`http://localhost:8000/api/airport/add/${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(airportdata),
  })
    .then((Response) => {
      return Response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
const getAllAirports = (token, userId, sort, offSet, limit) => {
  return fetch(
    `http://localhost:8000/api/airports/${sort}/${offSet}/${limit}/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const createAircraft = (aircraftData, token, userId) => {
  return fetch(`http://localhost:8000/api/aircraft/add/${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(aircraftData),
  })
    .then((Response) => {
      return Response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
const getAllAircraft = (userId, token, sort, offSet, limit) => {
  return fetch(
    `http://localhost:8000/api/aircraft/${sort}/${offSet}/${limit}/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const createTransaction = (transactionDetails, userId, token) => {
  return fetch(`http://localhost:8000/api/transaction/add/${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionDetails),
  })
    .then((Response) => {
      return Response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
const getAllTransaction = (userId, token, sort, offSet, limit) => {
  return fetch(
    `http://localhost:8000/api/transaction/${sort}/${offSet}/${limit}/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const getAllAirportsForSorting = (token, userId) => {
  return fetch(`http://localhost:8000/api/airports/forsorting/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAllAircraftForSorting = (userId, token) => {
  return fetch(`http://localhost:8000/api/aircraft/forsorting/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const transactionsForFuelConsumptionReport = (userId, token, searchTerm) => {
  return fetch(
    `http://localhost:8000/api/transaction/for-fuel-consumption-report/${searchTerm}/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
export default createAirport;
export {
  getAllAirports,
  createAircraft,
  getAllAircraft,
  createTransaction,
  getAllTransaction,
  getAllAirportsForSorting,
  getAllAircraftForSorting,
  transactionsForFuelConsumptionReport,
};
