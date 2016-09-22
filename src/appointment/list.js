import React, { PropTypes } from 'react';

const List = (props) => {
  const { appointments } = props;

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box">

          <div className="box-body table-responsive no-padding">
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Clinic</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              </thead>
              <tbody>
              {
                appointments.map(
                  app =>
                    <tr key={app.key}>
                      <td>
                        {app.name} <span style={{color: 'lightgrey'}}>({app.mobile})</span>
                      </td>
                      <td>{app.clinic}</td>
                      <td>{app.date}</td>
                      <td>{app.hour}:{app.minute}</td>
                      <td><span
                            style={{color: 'lightgrey', cursor: 'pointer' }}
                            className="glyphicon glyphicon-remove"
                            onClick={() => props.deleteAppointment(props.userId, app.key)}
                            ></span>
                      </td>
                    </tr>
                )
              }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  appointments: PropTypes.array
}

export default List;
