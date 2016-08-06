import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <form className="form-inline">
        <div className="row">
          <div className="col-md-2">
            <input type="text" className="form-control" id="name" placeholder="name" />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" id="mobile" placeholder="mobile" />
          </div>
          <div className="col-md-2">
            <select className="form-control" id="clinic" name="clinic">
              <option>Equilibrium</option>
              <option>Harley Street</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
