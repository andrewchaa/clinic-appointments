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
      <button onClick={() => {
          var ref = firebase.database().ref('appointments/' + props.userId);
          ref.orderByChild('date').equalTo('21/08/2016').on('child_added', function(snapshot) {
            console.log(snapshot.key);
          });
        }}>list
      </button>
    </div>
  )
}

List.propTypes = {
  appointments: PropTypes.array
}

export default List;
