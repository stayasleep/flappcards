import React from 'react';
import TextField from 'material-ui/TextField';
import {addCardInputFields, errorText} from './stackSummaryStyle';

//this is used for createStack header fields...need to figure out why the css included helps to prevent the ErrMsg from being crazy without it
export default function renderInput({input, label, type, meta: {active, dirty, touched, error}}) {
    return (
        <TextField
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
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