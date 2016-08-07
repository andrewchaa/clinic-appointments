import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const Example = props => {
  const selected = props.value ? moment(props.value) : null;
  return (
    <DatePicker {...timespan.date}
      selected={timespan.date.value ? moment(timespan.date.value, 'MM/DD/YY') : null }
      onChange={param => timespan.date.onChange(param)} />
    );
}

export default Example;
