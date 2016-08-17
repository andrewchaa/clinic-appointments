import React, { PropTypes } from 'react';

const List = (props) => {
  const { appointments } = props;

  return (
    <div>
      <table className="table table-striped">
        <tbody>
        {
          appointments.map(
            app =>
              <tr>
                <td>{app.name}</td>
                <td>{app.mobile}</td>
                <td>{app.clinic}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
              </tr>
          )
        }
        </tbody>
      </table>

      list
    </div>
  )
}

export default List;
