import React from 'react';
import TextField from 'material-ui/TextField';
import {addCardInputFields, errorText} from './stackSummaryStyle';

export default function renderInput({input, label, type, meta: {touched, error}}) {
    return (
        <TextField hintText={label}
                   floatingLabelText={label}
                   errorText={touched && error}
                   type={type}
                   style={addCardInputFields}
                   errorStyle={errorText}
                   {...input}
        />
    )
}