const ShowAircraft = ({ data }) => {
  return (
    <>
      <tr>
        <td>{new Date(data.createdAt).toLocaleString()}</td>
        <td>{data._id}</td>
        <td>{data.aircraftNo}</td>
        <td>{data.airline}</td>
      </tr>
    </>
  );
};
export default ShowAircraft;
