import React from 'react';
import TextField from 'material-ui/TextField';
import {addCardInputFields, errorText} from './stackSummaryStyle';
// Set the default text value to label if none were provided, else populate the fields with the old text
export default function renderInputCreateCard({fullWidth, input, label, type, meta: {active, touched, error}}) {
    return (
        <TextField errorText={(touched && !active && error) }
                   fullWidth={fullWidth}
                   errorStyle={errorText}
                   floatingLabelStyle={{color: "teal"}}
                   floatingLabelText={label}
                   hintText={label}
                   hintStyle={{color: "teal"}}
                   style={addCardInputFields}
                   type={type}
                   {...input}
        />
    )
}