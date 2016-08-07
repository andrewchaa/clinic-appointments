import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AppointmentForm from './AppointmentForm';

var onSubmit = (values, dispatch) => {

};

class App extends Component {
  render() {

    return (
      <div>
        <AppointmentForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointmentDate: state.appointmentDate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


App = connect(mapStateToProps, mapDispatchToProps) (App);

export default App;
