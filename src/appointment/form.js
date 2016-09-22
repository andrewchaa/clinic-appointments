import React, { PropTypes, Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import moment from 'moment';
import phone from 'phone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const fields = [ 'name', 'mobile', 'clinic', 'date', 'hour', 'minute', 'userId' ];

const validate = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Required';
  if (!values.mobile) errors.mobile = 'Required';

  console.log(values);
  return errors;
}

const add = (values, dispatch) => {
  var appointment = {
     name: values.name.trim(),
     mobile: phone(values.mobile.trim(), 'GB')[0],
     clinic: values.clinic,
     date: values.date,
     hour: values.hour,
     minute: values.minute,
     userId: values.userId
  };

  var path = '/appointments/' + values.userId + '/';
  var newAppointmentRef = firebase.database().ref(path).push(appointment);

  dispatch(reset('EntryForm'));
};

class EntryForm extends Component {

  render() {

    const {fields: { name, mobile, clinic, date, hour, minute, userId }, handleSubmit, submitting } = this.props;
    const selectedDate = this.props.fields.date.value ?
            moment(this.props.fields.date.value, 'DD/MM/YYYY') :
            moment();

    const labelClass = 'col-sm-1 control-label';
    const elementClass = 'col-sm-11';

    return (
      <div className="box box-info">
        <div className="box-header with-border">
          <h3 className="box-title">Register an appointment</h3>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit(add)}>
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="name" className={labelClass}>Name</label>
            <div className={elementClass}>
              <input type="text" className="form-control" id="name" placeholder="name" {...name} />
              <input type="hidden" {...userId} />
              { name.touched && name.error && <div style={{color: 'red'}}>{name.error}</div> }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobile" className={labelClass}>Mobile</label>
            <div className={elementClass}>
              <input type="text" className="form-control" id="mobile" placeholder="mobile" {...mobile} />
              { mobile.touched && mobile.error && <div style={{color: 'red'}}>{mobile.error}</div> }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="clinic" className={labelClass}>Clinic</label>
            <div className={elementClass}>
              <select className="form-control" id="clinic" {...clinic}>
                value={clinic.value || ''}
                <option>Equilibrium</option>
                <option>Harley Street</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date" className={labelClass}>Date</label><br />
            <div className={elementClass}>
              <DatePicker
                {...date}
                className="form-control"
                dateFormat="DD/MM/YYYY"
                selected={selectedDate}
                />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="hour" className={labelClass}>Hour</label>
            <div className={elementClass}>
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
          </div>
          <div className="form-group">
            <label htmlFor="minute" className={labelClass}>Minute</label>
            <div className={elementClass}>
              <select className="form-control" id="minute" {...minute} value={minute.value}>
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
            </div>
          </div>

          <div className="box-footer">
            <button type="submit" disabled={submitting} className="btn btn-info">
              {submitting ? <i className="glyphicon glyphicon-refresh" /> : <i />}
              Submit
            </button>
          </div>
        </div>
      </form>
      </div>
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
    fields,
    validate
  },
  state => ({ // mapStateToProps
    initialValues: {
      clinic: 'Harley Street',
      userId: state.userId,
      date: moment().format('DD/MM/YYYY'),
      hour: 9,
      minute: '00'
    }
  }),
  {
    // mapDispatchToProps

  }
)(EntryForm);
