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
              <tr key={app.key}>
                <td>{app.name}</td>
                <td>{app.mobile}</td>
                <td>{app.clinic}</td>
                <td>{app.date}</td>
                <td>{app.house}</td>
                <td>{app.minute}</td>
              </tr>
          )
        }
        </tbody>
      </table>

      list
    </div>
  )
}

List.propTypes = {
  appointments: PropTypes.array
}

export default List;
