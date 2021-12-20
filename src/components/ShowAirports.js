import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  airportFetchPending,
  fetchAirport,
} from "../redux/actions/AirportActions";
import { isAuthenticated } from "./auth/ApiCalling";
import { deleteAirport } from "./CommonApiCalls";
import { ToastContainer, toast } from "react-toastify";
const ShowAirports = ({ data }) => {
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();
  const deleteAirportData = async (airportId) => {
    const response = await deleteAirport(user._id, token, airportId);
    console.log(response.message);
    dispatch(airportFetchPending());
    dispatch(fetchAirport("firstFetch", 1, 10));
    toast.success(`Airport Deleted successfully`, {
      position: "top-center",
      autoClose: 2000,
    });
  };
  return (
    <>
      <tr>
        <td>{new Date(data.createdAt).toLocaleString()}</td>
        <td>{data._id}</td>
        <td>{data.airportName}</td>
        <td>{data.fuelCapacity}</td>
        <td>{data.fuelAvailable}</td>
        <td>
          <DeleteIcon
            onClick={() => {
              deleteAirportData(data._id);
            }}
          />
        </td>
      </tr>
    </>
  );
};
export default ShowAirports;
