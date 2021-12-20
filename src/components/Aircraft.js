import { useState, useEffect, useRef } from "react";
import { isAuthenticated, signout } from "./auth/ApiCalling";
import { createAircraft, getAllAircraft } from "./CommonApiCalls";
import ShowAircraft from "./ShowAircraft";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./Menu";
import { useHistory } from "react-router";
import {
  aircraftFetchPending,
  fetchAircrafts,
  toggleAircraftFetchPending,
} from "../redux/actions/AircraftActions";
import { useDispatch, useSelector } from "react-redux";

const Aircraft = () => {
  const history = useHistory();
  const [allAircraft, setAllAircraft] = useState([]);
  const addBtnRef = useRef();

  const [modal, setmodal] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortByText, setSortByText] = useState("firstFetch");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [aircraftData, setAircraftData] = useState({
    aircraftNo: "",
    airline: "",
  });
  const { user, token } = isAuthenticated();
  var userId = "";
  if (!user) {
    userId = "";
  } else {
    userId = user._id;
  }
  const closeModal = () => {
    setmodal(false);
  };
  const { AircraftReducer } = useSelector((state) => state);
  console.log(AircraftReducer);

  const addAircraft = async (event) => {
    event.preventDefault();
    dispatch(aircraftFetchPending());
    if (aircraftData.aircraftNo === "" || aircraftData.airline === "") {
      toast.error(`both data required`, {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const response = await createAircraft(aircraftData, token, user._id);
    if (response) {
      if (
        response.message === "unAthurizedUser" ||
        response.message === "invalid_token"
      ) {
        signout();
        history.push("/signin");
      }
      if (response.status === "error") {
        dispatch(toggleAircraftFetchPending());
        toast.error(`${response.message}`, {
          position: "top-center",
        });
      }
      if (response.status === "ok") {
        setSortByText("firstFetch");
        fetchAllAircraft(sortByText, 1, limit);
        closeModal();

        toast.success(`${response.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
        setAircraftData(() => {
          return { aircraftNo: "", airline: "" };
        });
      }
    }
    // const response = await createAircraft(aircraftData, token, user._id);
    // if (response) {
    //   if (
    //     response.message === "unAthurizedUser" ||
    //     response.message === "invalid_token"
    //   ) {
    //     signout();
    //     history.push("/signin");
    //   }
    //   console.log(response);
    //   if (response.status === "ok") {
    //     setSortByText("firstFetch");
    //     fetchAllAircraft(sortByText, 1, limit);
    //     toast.success("New Airpot Added", {
    //       position: "top-center",
    //     });

    //     setAircraftData(() => {
    //       return { aircraftId: "", aircraftNo: "", airline: "" };
    //     });
    //     closeModal();
    //   } else {
    //     toast.error(`${response.message}`, {
    //       position: "top-center",
    //     });
    //   }
    // }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    // if (name === "aircraftNo" && value !== "") {
    //   addBtnRef.current.disabled = false;
    // }
    if (name === "aircraftNo" && value === "") {
      addBtnRef.current.disabled = true;
    }
    // if (name === "airline" && value !== "") {
    //   addBtnRef.current.disabled = false;
    // }
    if (name === "airline" && value === "") {
      addBtnRef.current.disabled = true;
    }

    setAircraftData((preVal) => {
      return { ...preVal, [name]: value };
    });

    if (aircraftData.aircraftNo !== "" && aircraftData.airline !== "") {
      addBtnRef.current.disabled = false;
    }
    if (aircraftData.aircraftNo === "" || aircraftData.airline === "") {
      addBtnRef.current.disabled = true;
    }
  };
  const fetchAllAircraft = async (sort, page, limit) => {
    const offSet = (page - 1) * limit;

    if (!user) {
      userId = "";
    } else {
      userId = user._id;
    }
    dispatch(fetchAircrafts(userId, token, sort, offSet, limit));
    if (AircraftReducer) {
      if (
        AircraftReducer.message === "unAthurizedUser" ||
        AircraftReducer.message === "invalid_token"
      ) {
        signout();
        history.push("/signin");
      }

      setTotalRecord(AircraftReducer.totalRecord);
    }
  };

  useEffect(() => {
    if (AircraftReducer.status !== "ok") {
      fetchAllAircraft(sortByText, 1, limit);
    }
  }, []);
  const openModal = () => {
    setmodal(true);
  };

  const sortBy = async (event) => {
    dispatch(aircraftFetchPending());
    const text = event.target.value;
    fetchAllAircraft(text, 1, limit);
    setSortByText(text);
    setCurrentPage(1);
  };
  const calculateTotalNumberOFPages = (noOfRecord, limit) => {
    return Math.ceil(noOfRecord / limit);
  };
  const Pagination = () => {
    var arr = [];
    for (
      let index = 1;
      index <= calculateTotalNumberOFPages(AircraftReducer.totalRecord, limit);
      index++
    ) {
      arr.push(index);
    }
    if (AircraftReducer.totalRecord > limit) {
      return (
        <>
          <div className="text-center mt-5">
            {currentPage > 1 && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(aircraftFetchPending());
                  fetchAllAircraft(sortByText, currentPage - 1, limit);
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
                      dispatch(aircraftFetchPending());
                      fetchAllAircraft(sortByText, data, limit);
                      setCurrentPage(data);
                    }}
                  >
                    {data}
                  </button>
                </>
              );
            })}

            {calculateTotalNumberOFPages(AircraftReducer.totalRecord, limit) >
              currentPage && (
              <button
                className="btn btn-success"
                onClick={() => {
                  dispatch(aircraftFetchPending());
                  fetchAllAircraft(sortByText, currentPage + 1, limit);
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
            <h4 className="text-center text-primary">Add Aircraft Details</h4>

            <form method="post" onSubmit={addAircraft} autocomplete="off">
              <hr />
              <div className="formCon aircraftFormCon">
                <input
                  type="text"
                  name="aircraftNo"
                  placeholder="Aircraft Number"
                  required="required"
                  onChange={handleChange}
                  value={aircraftData.aircraftNo}
                />

                <input
                  type="text"
                  name="airline"
                  placeholder="Airline"
                  required="required"
                  onChange={handleChange}
                  value={aircraftData.airline}
                />

                <button
                  type="submit"
                  ref={addBtnRef}
                  disabled
                  className="btn btn-primary btn-lg"
                >
                  Add Aircraft
                </button>
                {AircraftReducer.pending &&
                AircraftReducer.status !== "error" ? (
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
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 ">
                    <button
                      className="btn btn-primary mt-2 "
                      onClick={openModal}
                    >
                      Add Aircraft
                    </button>
                  </div>
                  <div className="col-lg-6 sortBy">
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
                      <option value="airlineAsc">
                        Airline IN Accending Order
                      </option>
                      <option value="airlineDsc">
                        Airline IN Decending Order
                      </option>
                      <option value="recent"> Recent</option>
                      <option value="older"> Older</option>
                      <option value="aircraftNoAsc">
                        Aircraft Number In Accending Order
                      </option>
                      <option value="aircraftNoDsc">
                        Aircraft Number In Descending Order
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-5">
              <div class="table-responsive-md">
                <table className="table table-responsive table-boarderless  ">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Date/Time</th>
                      <th scope="col">Aircraft ID</th>
                      <th scope="col">Aircraft Number</th>
                      <th scope="col">Airline</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AircraftReducer.aircraft.length > 0 &&
                      AircraftReducer.aircraft.map((data, index) => {
                        return <ShowAircraft data={data} key={index} />;
                      })}
                  </tbody>
                </table>
              </div>

              {AircraftReducer.aircraft.length < 1 && (
                <div className="text-center text-danger">No Aircraft Found</div>
              )}
              {Pagination()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Aircraft;
