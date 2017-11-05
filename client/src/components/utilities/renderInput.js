import React from 'react';
import TextField from 'material-ui/TextField';
import {addCardInputFields, errorText} from './stackSummaryStyle';
// Set the default text value to label if none were provided, else populate the fields with the old text

//this is used for createCards, it will be repurposed for text boxes with rows instead of this input tag
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