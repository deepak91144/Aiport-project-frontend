import DeleteIcon from "@mui/icons-material/Delete";
import { isAuthenticated } from "./auth/ApiCalling";
import { deleteAircraft } from "./CommonApiCalls";
import { ToastContainer, toast } from "react-toastify";
import {
  aircraftFetchPending,
  fetchAircrafts,
} from "../redux/actions/AircraftActions";
import { useDispatch } from "react-redux";

const ShowAircraft = ({ data }) => {
  const dispatch = useDispatch();
  const { token } = isAuthenticated();
  const deleteAircraftData = async (aircraftId) => {
    const response = await deleteAircraft(token, aircraftId);
    dispatch(aircraftFetchPending());
    dispatch(fetchAircrafts(token, "firstFetch", 0, 10));
    toast.success(`Aircraft Deleted successfully`, {
      position: "top-center",
      autoClose: 2000,
    });
  };
  return (
    <>
      <tr>
        <td>{new Date(data.createdAt).toLocaleString()}</td>
        <td>{data._id}</td>
        <td>{data.aircraftNo}</td>
        <td>{data.airline}</td>
        <td>
          <DeleteIcon
            onClick={() => {
              deleteAircraftData(data._id);
            }}
          />
        </td>
      </tr>
    </>
  );
};
export default ShowAircraft;
