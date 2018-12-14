import React from "react";

const Hotel = ({ data, onDetailsClick }) => (
  <tr>
    <td>{data.name}</td>
    <td>{data.city}</td>
    <td>{data.country}</td>
    <td>{data.price}</td>
    <td>{data.stars}</td>
    <td>
      <button className="btn-flat btn-small" onClick={onDetailsClick(data.id)}>
        <i className="material-icons">chevron_right</i>
      </button>
    </td>
  </tr>
);

export default Hotel;
