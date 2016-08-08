import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import 'bootstrap-datepicker'

const fields = [ 'patientName', 'mobile', 'clinic', 'appointmentDate', 'appointmentTime' ];

var onSubmit = (values, dispatch) => {
  console.log(values);
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
            value={clinic.value || ''}>
            <option>Equilibrium</option>
            <option>Harley Street</option>
          </select>
          <input type="text" className="form-control" id="appointmentDate" name="appointmentDate" {...appointmentDate} />
          <input type="text" className="form-control" id="appointmentTime" name="appointmentTime" {...appointmentTime} />
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
    form: 'AppointmentForm',
    fields
  },
  state => ({ initialValues: { clinic: 'Equilibrium' } })
)(AppointmentForm);
