const ShowTransaction = ({ data }) => {
  return (
    <>
      <tr>
        <td>{new Date(data.createdAt).toLocaleString()}</td>
        <td>
          {" "}
          {data.aircraftId !== null ? (
            data.aircraftId.airline
          ) : (
            <div className="text-danger">Airline Not Available</div>
          )}
        </td>
        <td>{data.quantity}</td>
        <td style={{ textTransform: "uppercase" }}>{data.transactionType}</td>
        <td>{data.airportId ? data.airportId.airportName : ""}</td>
      </tr>
    </>
  );
};
export default ShowTransaction;
