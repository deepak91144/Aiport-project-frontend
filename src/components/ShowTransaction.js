import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  fetchTransactions,
  transactionFetchPending,
} from "../redux/actions/TransactionActions";
import { isAuthenticated } from "./auth/ApiCalling";
import { deleteTransaction } from "./CommonApiCalls";
import { ToastContainer, toast } from "react-toastify";
const ShowTransaction = ({ data }) => {
  const dispatch = useDispatch();
  const { token } = isAuthenticated();
  const deleteTransactionData = async (transactionId) => {
    dispatch(transactionFetchPending());
    const response = await deleteTransaction(token, transactionId);

    toast.success(`transaction deleted `, {
      position: "top-center",
      autoClose: 2000,
    });
    dispatch(fetchTransactions(token, "firstFetch", 0, 10));
  };
  return (
    <>
      <tr>
        <td>{new Date(data.createdAt).toLocaleString()}</td>
        <td>
          {data.aircraftId !== null ? (
            data.aircraftId.aircraftNo
          ) : (
            <div className="text-danger">Airline Not Available</div>
          )}
        </td>
        <td>{data.quantity}</td>
        <td style={{ textTransform: "uppercase" }}>{data.transactionType}</td>
        <td>{data.airportId ? data.airportId.airportName : ""}</td>
        <td>
          <DeleteIcon
            onClick={() => {
              deleteTransactionData(data._id);
            }}
          />
        </td>
      </tr>
    </>
  );
};
export default ShowTransaction;
