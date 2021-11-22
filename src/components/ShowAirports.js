const ShowAirports = ({ data }) => {
  return (
    <>
      <tr>
        <td>{new Date(data.createdAt).toLocaleString()}</td>
        <td>{data._id}</td>
        <td>{data.airportName}</td>
        <td>{data.fuelCapacity}</td>
        <td>{data.fuelAvailable}</td>
      </tr>
    </>
  );
};
export default ShowAirports;
