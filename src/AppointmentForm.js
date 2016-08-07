import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

var onSubmit = (values, dispatch) => {

};

class AppointmentForm extends Component {
  render() {

    const {fields: { patientName, mobile, clinic, appointmentDate, appointmentTime }, handleSubmit, submitting } = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <input type="text" className="form-control" id="patientName" name="patientName" placeholder="name" {...patientName} />
          <input type="text" className="form-control" id="mobile" placeholder="mobile" {...mobile} />
          <select className="form-control" id="clinic" name="clinic" {...clinic}>
            <option>Equilibrium</option>
            <option>Harley Street</option>
          </select>
          <DatePicker {...appointmentDate}
            dateFormat='DD/MM/YYYY'
            selected={appointmentDate.value ? moment(appointmentDate.value) : null }
            className="form-control" />
          <input type="text" className="form-control" id="appointmentTime" name="appointmentTime" {...appointmentTime} />
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
    form: 'AppointmentForm',
    fields: [ 'patientName', 'mobile', 'clinic', 'appointmentDate', 'appointmentTime' ]
})(AppointmentForm);
