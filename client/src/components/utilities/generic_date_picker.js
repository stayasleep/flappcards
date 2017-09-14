import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default ({ input, label, meta: { touched, error }, ...custom }) => {
console.log('reg picker',custom);
    return (
        <DatePicker
            id="birth-date"
            floatingLabelStyle={{color: "teal"}}
            floatingLabelText={label}

            onChange={(e, val) => {return console.log('vals eh',input.onChange(val))}}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            okLabel="Select"
            {...custom}
        />
    );
}