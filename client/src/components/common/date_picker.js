import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default ({ input, label, meta: { touched, error }, ...custom }) => {
    console.log('these extra propos',custom);
    return (
        <DatePicker
            id="datePicker"
            onChange={(e, val) => {return console.log('vals eh',input.onChange(val))}}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            okLabel="Select"

            //defaultDate={custom.defaultValue.min}
            //onDismiss={()=> custom.onClose()}

            {...custom}
        />
    );
}