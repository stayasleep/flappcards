import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const DatePickerForm = (props) => {
    return(
        <div>
            <DatePicker openToYearSelection={true}/>
        </div>
    )
};

export default DatePickerForm;