import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default ({ input, label, meta: { touched, error }, ...custom }) => {
    return (
        <DatePicker
            id="datePicker"
            onChange={(e, val) => {return input.onChange(val)}}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            okLabel="Select"

            //defaultDate={custom.defaultValue.min}
            //onDismiss={()=> custom.onClose()}

            {...custom}
        />
    );
}