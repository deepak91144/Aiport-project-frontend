import { useState } from "react";
import {
  aircraftFetchPending,
  fetchAircrafts,
  toggleAircraftFetchPending,
} from "../redux/actions/AircraftActions";

import { useDispatch, useSelector } from "react-redux";
const Pagination = ({
  fetchAllAircraft,
  currentPage,
  AircraftReducer,
  limit,
  setCurrentPage,
  sortByText,
}) => {
  const dispatch = useDispatch();
  const calculateTotalNumberOFPages = (noOfRecord, limit) => {
    return Math.ceil(noOfRecord / limit);
  };
  var arr = [];
  for (
    let index = 1;
    index <= calculateTotalNumberOFPages(AircraftReducer.totalRecord, limit);
    index++
  ) {
    arr.push(index);
  }

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
};
export default Pagination;
