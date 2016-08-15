import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';

const fields = [ 'name', 'mobile', 'clinic', 'date', 'time', 'userId' ];

const add = (values, dispatch) => {
  console.log(values);

  var appointment = {
     name: values.name,
     mobile: values.mobile,
     clinic: values.clinic,
     date: values.date,
     time: values.time,
     userId: values.userId
  };

   // Get a key for a new Post.
   var newKey = firebase.database().ref().child('appointments').push().key;

   // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['/appointments/' + newKey] = appointment;
   updates['/user-appointments/' + appointment.userId + '/' + newKey] = appointment;

   return firebase.database().ref().update(updates);

};

class AppointmentForm extends Component {
  render() {

    const {fields: { name, mobile, clinic, date, time, userId }, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(add)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="name" {...name} />
          <input type="hidden" {...userId} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" className="form-control" id="mobile" placeholder="mobile" {...mobile} />
        </div>
        <div className="form-group">
          <label htmlFor="clinic">Clinic</label>
          <select className="form-control" id="clinic" {...clinic}>
            value={clinic.value || ''}>
            <option>Equilibrium</option>
            <option>Harley Street</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="text" className="form-control" id="date" name="date" {...date} />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="text" className="form-control" id="time" name="time" {...time} />
        </div>

        <button type="submit" disabled={submitting} className="btn btn-default">
          {submitting ? <i className="glyphicon glyphicon-refresh" /> : <i />}
          Submit
        </button>
      </form>
    );
  }
}

AppointmentForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
    form: 'AppointmentForm',
    fields
  },
  state => ({ // mapStateToProps
    initialValues: {
      clinic: 'Equilibrium',
      userId: state.userId
    }
  })
)(AppointmentForm);
