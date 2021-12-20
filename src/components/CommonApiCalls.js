export const BASEAPI = "http://localhost:8000/api/v1";
const createAirport = (airportdata, token, userId) => {
  return fetch(`${BASEAPI}/airport/add`, {
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
const createAircraft = (aircraftData, token, userId) => {
  return fetch(`${BASEAPI}/aircraft/add`, {
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
    `${BASEAPI}/aircraft?sortBy=${sort}&offSet=${offSet}&limit=${limit}`,
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
  return fetch(`${BASEAPI}/transaction/add`, {
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
    `${BASEAPI}/transaction?sortBy=${sort}&offSet=${offSet}&limit=${limit}`,
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

const deleteAirport = async (userId, token, airportId) => {
  return await fetch(`${BASEAPI}/airport/${airportId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteAircraft = async (userId, token, aircraftId) => {
  return await fetch(`${BASEAPI}/aircraft/${aircraftId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTransaction = async (userId, token, transactionId) => {
  return await fetch(`${BASEAPI}/transaction/${transactionId}`, {
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
