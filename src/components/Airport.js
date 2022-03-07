import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated, signout } from "./auth/ApiCalling";
import createAirport, { getAllAirports } from "./CommonApiCalls";
import Menu from "./Menu";
import "../App.css";
import ShowAirports from "./ShowAirports";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AirportConstant } from "../redux/constants/AirportConstants";
import {
  airportFetchPending,
  fetchAirport,
  toggleAirportFetchPending,
} from "../redux/actions/AirportActions";
import { AuthReducer } from "../redux/reducers/auth/AuthReducer";

const AddAirport = () => {
  //state to toggle modal, modal can be shown value is true else modal remains closed
  const [modal, setModal] = useState(false);
  // array to store all airport details comming from api response
  const [airport, setAirport] = useState([]);
  // state to hold total number of record of airport model
  const [totalRecord, setTotalRecord] = useState(0);
  //error message sate
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState("");
  // initiate useHistory object
  const history = useHistory();
  // state to hold limit value
  const [limit, setLimit] = useState(10);
  // destructure user and token from isAuthenticated function
  const { token } = isAuthenticated();
  // state that holds sorting text
  const [sortByText, setSortByText] = useState("firstFetch");
  //state that holds what current page is
  const [currentPage, setCurrentPage] = useState(1);
  // state that holds initial value of different input box
  const [airportdata, setAirportdata] = useState({
    airportName: "",
    fuelCapacity: "",
    fuelAvailable: "",
  });
  const addBtnRef = useRef();

  const { AirportReducer, AircraftReducer } = useSelector((state) => state);
  console.log(AirportReducer);

  const dispatch = useDispatch();
  // function to add new airport details

  const addAirport = async (event) => {
    event.preventDefault();
    dispatch(airportFetchPending());

    const response = await createAirport(airportdata, token);
    if (response) {
      if (
        response.message === "unAthurizedUser" ||
        response.message === "invalid_token"
      ) {
        signout();
        history.push("/signin");
      }
      if (response.status === "error") {
        dispatch(toggleAirportFetchPending());
        toast.error(`${response.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
      if (response.status === "ok") {
        dispatch(fetchAirport(sortByText, 1, limit));
        closeModal();
        toast.success(`${response.message}`, {
          position: "top-center",
        });
        setAirportdata(() => {
          return { airportName: "", fuelCapacity: "", fuelAvailable: "" };
        });
      }
    }
  };

  // function to get the value from respective input box
  const handleChange = (event) => {
    // destructure name and value from active input box
    const { name, value } = event.target;
    // setting values to input box which is currently active
    if (name === "fuelAvailable") {
      if (Number(value) > Number(airportdata.fuelCapacity)) {
        setErr("fuel Availabe should be less than capacity");
        addBtnRef.current.disabled = true;
      }
      if (Number(value) < Number(airportdata.fuelCapacity)) {
        addBtnRef.current.disabled = false;
        setErr("");
      }
    } else {
      setErr("");
    }
    setAirportdata((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  // useEfect hook
  useEffect(() => {
    if (AuthReducer.invalidToken === true) {
      signout();
      history.push("/signin");
    }
    if (AirportReducer.status !== "ok") {
      // call fetchAirports method to fetch all airport when firsttime component loaded
      // fetchAirports(sortByText, 1, 3);
      dispatch(fetchAirport(sortByText, 1, limit));
    }
  });

  // function to show modal
  const openModal = () => {
    setModal(true);
  };
  // function to close the modal
  const closeModal = () => {
    setModal(false);
  };

  // function that triggered when user sort record
  const sortBy = async (event) => {
    dispatch(airportFetchPending());

    // fetcing airport according to the sorting text
    // fetchAirports(event.target.value, 1, 3);
    dispatch(fetchAirport(event.target.value, 1, limit));
    // set sort by text to the sortByText state
    setSortByText(event.target.value);
    // set the currentPage state to the current page value
    setCurrentPage(1);
  };

  // function to calculate how many pages to be made for the pagination
  const calculateTotalNumberOFPages = (noOfRecord, limit) => {
    return Math.ceil(noOfRecord / limit);
  };

  // function that returns pagination UI and login
  const Pagination = () => {
    var arr = [];
    for (
      let index = 1;
      index <= calculateTotalNumberOFPages(AirportReducer.totalRecord, limit);
      index++
    ) {
      arr.push(index);
    }

    if (AirportReducer.totalRecord > limit) {
      return (
        <>
          <div className="text-center mt-5">
            {currentPage > 1 && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(airportFetchPending());
                  // fetchAirports(sortByText, currentPage - 1, 3);
                  dispatch(fetchAirport(sortByText, currentPage - 1, limit));
                  setCurrentPage(currentPage - 1);
                }}
              >
                prev
              </button>
            )}

            {arr.map((data, index) => {
              return (
                <>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                      // fetchAirports(sortByText, data, 3);
                      dispatch(airportFetchPending());
                      dispatch(fetchAirport(sortByText, data, limit));
                      setCurrentPage(data);
                    }}
                  >
                    {data}
                  </button>
                </>
              );
            })}
            {calculateTotalNumberOFPages(AirportReducer.totalRecord, limit) >
              currentPage && (
              <button
                className="btn btn-success"
                onClick={() => {
                  dispatch(airportFetchPending());
                  // fetchAirports(sortByText, currentPage + 1, 3);
                  dispatch(fetchAirport(sortByText, currentPage + 1, limit));
                  setCurrentPage(currentPage + 1);
                }}
              >
                next
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
          <div className="modalForm">
            <h4 className="text-center text-primary">Add Airport Details</h4>
            <hr />
            <form method="post" onSubmit={addAirport} autocomplete="off">
              <div className="formCon">
                <input
                  type="text"
                  name="airportName"
                  placeholder="Airport Name"
                  required="required"
                  onChange={handleChange}
                  value={airportdata.airportName}
                />

                <input
                  type="number"
                  name="fuelCapacity"
                  placeholder="Fuel capacity"
                  required="required"
                  onChange={handleChange}
                  value={airportdata.fuelCapacity}
                />

                <input
                  type="number"
                  name="fuelAvailable"
                  placeholder="Fuel Available"
                  required="required"
                  onChange={handleChange}
                  value={airportdata.fuelAvailable}
                />
                <div className="text-danger">{err}</div>

                <button
                  type="submit"
                  disabled
                  ref={addBtnRef}
                  className="btn btn-primary btn-lg"
                >
                  Add Airport
                </button>
                {AirportReducer.pending && AirportReducer.status !== "error" ? (
                  <div
                    className="text-success"
                    style={{ fontSize: "20px", marginTop: "3px" }}
                  >
                    Adding...
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
            <div className="col-lg-6 d-flex justify-content-center  justify-content-lg-start ">
              <button className="btn btn-primary " onClick={openModal}>
                Add Airport
              </button>
            </div>
            <div className="col-lg-6 sortBy  d-flex   justify-content-center justify-content-lg-end ">
              <select
                style={{
                  padding: "10px",
                  borderColor: "red",
                  borderRadius: "10px",
                  outline: "none",
                }}
                name="sort"
                onChange={sortBy}
              >
                <option disabled selected>
                  Sort By
                </option>
                <option value="airportNameAsc">
                  Airport IN Accending Order
                </option>
                <option value="airportNameDsc">
                  Airport IN Decending Order
                </option>
                <option value="recent"> Recent</option>
                <option value="older"> Older</option>
                <option value="fuelCapacityAsc">
                  Fuel Capacity In Asccending Order
                </option>
                <option value="fuelCapacityDsc">
                  Fuel Capacity In Desccending Order
                </option>
                <option value="fuelAvlAsc">
                  Fuel Availability In Assccending Order
                </option>
                <option value="fuelAvlDsc">
                  Fuel Availability In Dessccending Order
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div class="table-responsive-md ">
                <table className="table table-sm  ">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Date/Time</th>
                      <th scope="col">Airport ID</th>
                      <th scope="col">Airport Name</th>
                      <th scope="col">Fuel Capacity(in liter)</th>
                      <th scope="col">Fuel Availabe(in liter)</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AirportReducer.airports.length > 0 &&
                      AirportReducer.airports.map((data, index) => {
                        return <ShowAirports data={data} key={index} />;
                      })}
                  </tbody>
                </table>
              </div>
              {AirportReducer.airports.length < 1 && (
                <div className="text-center text-danger">No Airport Found</div>
              )}
              {Pagination()};
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default AddAirport;
