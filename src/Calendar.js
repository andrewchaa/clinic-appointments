import React from 'react';
var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

var Example = React.createClass({
  displayName: 'Appointment Date',

  getInitialState: function() {
    return {
      appointmentDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      appointmentDate: date
    });
  },

  render: function() {

    return <DatePicker className="form-control"
        dateFormat="DD/MM/YYYY"
        selected={this.state.appointmentDate}
        onChange={this.handleChange} />;
  }
});

export default Example;
