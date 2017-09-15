import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default ({ input, label, meta: { touched, error }, ...custom }) => {
    return (
        <DatePicker
            id="datePicker"
            onChange={(e, val) => {return console.log('vals eh',input.onChange(val))}}
            defaultDate={custom.defaultValue.min}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            onDismiss={()=> custom.onClose()}
            okLabel="Select"
        />
    );
}