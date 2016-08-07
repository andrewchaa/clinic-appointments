import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import Calendar from './Calendar.js'

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
          <Calendar id="appointmentDate" name="appointmentDate" {...this.props} />
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
