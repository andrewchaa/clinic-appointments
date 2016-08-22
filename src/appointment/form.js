import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const fields = [ 'name', 'mobile', 'clinic', 'date', 'hour', 'minute', 'userId' ];

const add = (values, dispatch) => {
  var appointment = {
     name: values.name,
     mobile: values.mobile,
     clinic: values.clinic,
     date: values.date,
     hour: values.hour,
     minute: values.minute,
     userId: values.userId
  };

  var path = '/appointments/' + values.userId + '/';
  var newKey = firebase.database().ref().child(path).push().key;

  var updates = {};
  updates[path + newKey] = appointment;

  return firebase.database().ref().update(updates);

};

class EntryForm extends Component {

  render() {

    const {fields: { name, mobile, clinic, date, hour, minute, userId }, handleSubmit, submitting } = this.props;
    const selectedDate = this.props.fields.date.value ?
            moment(this.props.fields.date.value, 'DD/MM/YYYY') :
            moment();

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
            value={clinic.value || ''}
            <option>Equilibrium</option>
            <option>Harley Street</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label><br />
          <DatePicker
            {...date}
            className="form-control"
            dateFormat="DD/MM/YYYY"
            selected={selectedDate}
            />
        </div>
        <div className="form-group">
          <label htmlFor="hour">Hour</label>
          <select className="form-control" id="hour" {...hour} value={hour.value || ''}>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="minute">Minute</label>
          <select className="form-control" id="minute" {...minute} value={minute.value}>
            <option>0</option>
            <option>15</option>
            <option>30</option>
            <option>45</option>
          </select>
        </div>

        <button type="submit" disabled={submitting} className="btn btn-default">
          {submitting ? <i className="glyphicon glyphicon-refresh" /> : <i />}
          Submit
        </button>
      </form>
    );
  }
}

EntryForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
    form: 'EntryForm',
    fields
  },
  state => ({ // mapStateToProps
    initialValues: {
      clinic: 'Equilibrium',
      userId: state.userId,
      date: moment().format('DD/MM/YYYY'),
      hour: 9,
      minute: 0
    }
  }),
  {
    // mapDispatchToProps

  }
)(EntryForm);
