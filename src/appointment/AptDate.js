import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const AptDate = React.createClass({
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
    return (
      <DatePicker
        className="form-control"
        dateFormat="DD/MM/YYYY"
        selected={this.state.startDate}
        onChange={this.handleChange} />
    )
  }
});

export default AptDate;
