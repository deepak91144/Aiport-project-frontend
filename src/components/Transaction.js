import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAirport } from "../redux/actions/AirportActions";

import {
  fetchTransactions,
  toggleTransactionFetchPending,
  transactionFetchPending,
} from "../redux/actions/TransactionActions";
import { isAuthenticated, signout } from "./auth/ApiCalling";

import { createTransaction, getAllTransaction } from "./CommonApiCalls";
import Menu from "./Menu";
import ShowTransaction from "./ShowTransaction";

const Transaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  let [validationErr, setValidationErr] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAirline, setShowAirline] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [allAircraft, setAllAircraft] = useState([]);
  const [airport, setAirport] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(10);
  const history = useHistory();
  const [textForSorting, setTextForSorting] = useState("firstFetch");
  const [modal, setModal] = useState(false);
  const addBtnRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const sortByAirportRef = useRef();
  const sortByRef = useRef();
  const dispatch = useDispatch();
  const { AirportReducer, AircraftReducer, TransactionReducer } = useSelector(
    (state) => state
  );

  const { token } = isAuthenticated();

  const fetchAllTransaction = async (sort, page, limit) => {
    const offSet = (page - 1) * limit;
    dispatch(fetchTransactions(token, sort, offSet, limit));
  };
  useEffect(async () => {
    if (TransactionReducer.status !== "ok") {
      fetchAllTransaction(textForSorting, 1, limit);
    }
  }, []);
  const [transactionData, setTransactionData] = useState({
    transactionType: "",
    airportId: "",
    aircraftId: "",
    quantity: "",
    transactionIdParent: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "transactionType" && value === "out") {
      setShowAirline(true);
    }
    if (name === "transactionType" && value === "in") {
      setShowAirline(false);
    }
    setTransactionData((preVal) => {
      return { ...preVal, [name]: value };
    });
    if (
      transactionData.transactionType !== "" &&
      transactionData.airportId !== "" &&
      transactionData.quantity !== ""
    ) {
      addBtnRef.current.disabled = false;
    }
  };
  const addTransaction = async (event) => {
    event.preventDefault();
    dispatch(transactionFetchPending());

    const response = await createTransaction(transactionData, token);

    if (response) {
      if (
        response.message === "unAthurizedUser" ||
        response.message === "invalid_token"
      ) {
        signout();
        history.push("/signin");
      }
      if (response.status === "ok") {
        setTextForSorting("firstFetch");
        fetchAllTransaction(textForSorting, 1, limit);
        dispatch(fetchAirport("firstFetch", 1, 10));
        toast.success("New Transaction Done Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        closeModal();

        setTransactionData(() => {
          return {
            transactionType: "",
            airportId: "",
            aircraftId: "",
            quantity: "",
            transactionIdParent: "",
          };
        });
      } else {
        dispatch(toggleTransactionFetchPending());

        toast.error(`${response.message}`, {
          position: "top-center",
        });
      }
    }
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const sortBy = async (event) => {
    dispatch(transactionFetchPending());
    const text = event.target.value;
    fetchAllTransaction(text, 1, limit);
    sortByAirportRef.current.selectedIndex = null;
    setTextForSorting(text);
    setCurrentPage(1);
  };
  const sortByAiport = async (e) => {
    dispatch(transactionFetchPending());
    const text = e.target.value;
    sortByRef.current.selectedIndex = null;
    fetchAllTransaction(text, 1, limit);
    setTextForSorting(text);
    setCurrentPage(1);
  };

  const calculateTotalNumberOFPages = (noOfRecord, limit) => {
    return Math.ceil(noOfRecord / limit);
  };
  const Pagination = () => {
    var arr = [];
    for (
      let index = 1;
      index <=
      calculateTotalNumberOFPages(TransactionReducer.totalRecord, limit);
      index++
    ) {
      arr.push(index);
    }

    if (TransactionReducer.totalRecord > limit) {
      return (
        <>
          <div className="text-center mt-5">
            {currentPage > 1 && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(transactionFetchPending());
                  fetchAllTransaction(textForSorting, currentPage - 1, limit);
                  setCurrentPage(currentPage - 1);
                }}
              >
                Prev
              </button>
            )}
            {arr.map((data, index) => {
              return (
                <>
                  <button
                    className="btn btn-primary m-2"
                    onClick={(e) => {
                      dispatch(transactionFetchPending());
                      fetchAllTransaction(textForSorting, data, limit);
                      setCurrentPage(data);
                    }}
                  >
                    {data}
                  </button>
                </>
              );
            })}
            {calculateTotalNumberOFPages(
              TransactionReducer.totalRecord,
              limit
            ) > currentPage && (
              <button
                className="btn btn-success"
                onClick={() => {
                  dispatch(transactionFetchPending());
                  fetchAllTransaction(textForSorting, currentPage + 1, limit);
                  setCurrentPage(currentPage + 1);
                }}
              >
                Next
              </button>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Menu />

      <ToastContainer autoClose={2000} />

      {modal && (
        <div className="aiportModal" style={{ display: modal }}>
          <div className="modalForm transactionModal">
            <h4 className="text-center text-primary">Create Transaction</h4>

            <hr />
            <form method="post" onSubmit={addTransaction} autocomplete="off">
              <div className="formCon">
                <select required name="transactionType" onChange={handleChange}>
                  <option disabled selected>
                    select type
                  </option>
                  <option className="form-control" value="in">
                    IN
                  </option>
                  <option className="form-control" value="out">
                    OUT
                  </option>
                </select>

                <select required name="airportId" onChange={handleChange}>
                  <option disabled selected>
                    select Airport
                  </option>
                  {AirportReducer.allAirport.map((data, index) => {
                    return (
                      <>
                        <option value={data._id}>{data.airportName}</option>
                      </>
                    );
                  })}
                </select>

                {showAirline && (
                  <select required name="aircraftId" onChange={handleChange}>
                    <option disabled selected>
                      select Airline
                    </option>
                    {AircraftReducer.allAircraft.map((data, index) => {
                      return (
                        <>
                          <option value={data._id}>{data.aircraftNo}</option>
                        </>
                      );
                    })}
                  </select>
                )}

                <input
                  type="number"
                  className="qty"
                  name="quantity"
                  placeholder="Quantity"
                  required="required"
                  onChange={handleChange}
                  // value={transactionData.quantity}
                />

                <button
                  type="submit"
                  ref={addBtnRef}
                  disabled
                  className="btn btn-primary btn-lg"
                >
                  Make Transaction
                </button>
                {TransactionReducer.pending &&
                TransactionReducer.error !== "error" ? (
                  <div
                    className="text-success"
                    style={{ fontSize: "20px", marginTop: "3px" }}
                  >
                    creating...
                  </div>
                ) : (
                  ""
                )}
              </div>
            </form>

            <div onClick={closeModal} className="closeBtn">
              X
            </div>
          </div>
        </div>
      )}
      <main>
        <div className="container ">
          <div className="row ">
            <div className="col-lg-4 d-flex   justify-content-center justify-content-lg-start ">
              <button className="btn btn-primary  " onClick={openModal}>
                Create Transaction
              </button>
            </div>
            <div className="col-lg-4 sortBy d-flex   justify-content-center justify-content-lg-center">
              <select
                style={{
                  padding: "10px",
                  borderColor: "red",
                  borderRadius: "10px",
                  outline: "none",
                  width: "58%",
                }}
                ref={sortByRef}
                name="sort"
                onChange={sortBy}
              >
                <option disabled selected>
                  Sort By
                </option>

                <option value="recent"> Recent</option>
                <option value="older"> Older</option>
                <option value="in">IN Type Transaction</option>
                <option value="out">OUT Type Transaction</option>
                <option value="quantityAsc">
                  Quantity In Assccending Order
                </option>
                <option value="quantityDsc">
                  Quantity In Dessccending Order
                </option>
              </select>
            </div>
            <div className="col-lg-4 sortBy d-flex   justify-content-center justify-content-lg-end ">
              <select
                style={{
                  padding: "10px",
                  borderColor: "red",
                  borderRadius: "10px",
                  outline: "none",
                  width: "58%",
                }}
                ref={sortByAirportRef}
                name="sort"
                onChange={sortByAiport}
              >
                <option disabled selected>
                  Filter By Airport
                </option>

                {AirportReducer.allAirport.map((data, index) => {
                  return (
                    <>
                      <option value={data._id}>{data.airportName}</option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div class="table-responsive-md">
                <table className="table table-sm mt-2 table-borderless ">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Date/Time</th>
                      <th scope="col">Airline</th>
                      <th scope="col">Quantity(in liter)</th>
                      <th scope="col">Transaction Type</th>
                      <th scope="col">Airport</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TransactionReducer.transactions.length > 0 &&
                      TransactionReducer.transactions.map((data, index) => {
                        return <ShowTransaction data={data} key={index} />;
                      })}
                  </tbody>
                </table>
              </div>
              {TransactionReducer.transactions.length < 1 && (
                <div className="text-center text-danger">
                  No Transaction Found
                </div>
              )}
              {Pagination()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Transaction;
