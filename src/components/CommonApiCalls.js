export const BASEAPI = "http://localhost:8000/api/v1";
const createAirport = (airportdata, token, userId) => {
  return fetch(`${BASEAPI}/airports`, {
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
const getAllAirports = (token, sort, offSet, limit) => {
  return fetch(
    `${BASEAPI}/airports?sortBy=${sort}&offSet=${offSet}&limit=${limit}`,
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
const createAircraft = (aircraftData, token) => {
  return fetch(`${BASEAPI}/aircrafts`, {
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
const getAllAircraft = (token, sort, offSet, limit) => {
  return fetch(
    `${BASEAPI}/aircrafts?sortBy=${sort}&offSet=${offSet}&limit=${limit}`,
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
const createTransaction = (transactionDetails, token) => {
  return fetch(`${BASEAPI}/transactions`, {
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
const getAllTransaction = (token, sort, offSet, limit) => {
  return fetch(
    `${BASEAPI}/transactions?sortBy=${sort}&offSet=${offSet}&limit=${limit}`,
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

const deleteAirport = async (token, airportId) => {
  return await fetch(`${BASEAPI}/airports/${airportId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteAircraft = async (token, aircraftId) => {
  return await fetch(`${BASEAPI}/aircrafts/${aircraftId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTransaction = async (token, transactionId) => {
  return await fetch(`${BASEAPI}/transactions/${transactionId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createAirport;
export {
  getAllAirports,
  createAircraft,
  getAllAircraft,
  createTransaction,
  getAllTransaction,
  deleteAirport,
  deleteAircraft,
  deleteTransaction,
};
