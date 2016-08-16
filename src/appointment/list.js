import React, { PropTypes } from 'react';

const List = (props) => {
  const { appointments } = props;

  return (
    <div>
      <table>
      {
        appointments.map(
          app => <tr><td>app.name</td></tr>

        )
      }
      </table>

      list
    </div>
  )
}

export default List;
