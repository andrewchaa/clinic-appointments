import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

var Example = React.createClass({
  displayName: 'Example',

  getInitialState: function() {
    return {
      startDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <DatePicker
            className="form-control"
            dateFormat="DD/MM/YYYY"
    // selected={this.props.fields.date.value ? moment(this.props.fields.date.value) : moment()}
    // // selected={moment()}
    // onChange={() => console.log(this.props.fields.date.value)}

        selected={this.state.startDate}
        onChange={this.handleChange} />;
  }
});
