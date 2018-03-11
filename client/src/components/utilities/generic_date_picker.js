import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default ({ input, label, meta: { touched, error }, ...custom }) => {
    return (
        <DatePicker
            id="birth-date"
            onChange={(e, val) => {}}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            okLabel="Select"

            floatingLabelStyle={{color: "teal"}}
            floatingLabelText={label}

            {...custom}
        />
    );
}