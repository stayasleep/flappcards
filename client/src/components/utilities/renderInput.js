import React from 'react';
import TextField from 'material-ui/TextField';
import {addCardInputFields, errorText} from './stackSummaryStyle';

export default function renderInput({input, label, type, meta: {touched, error}}) {
    return (
        <TextField hintText={label}
                   floatingLabelStyle={{color: "rgba(0,0,0,0,0.75)"}}
                   hintStyle={{color: "rgba(0,0,0,0,0.75)"}}
                   floatingLabelText={label}
                   errorText={touched && error}
                   underlineStyle={{width: 150}}
                   type={type}
                   style={addCardInputFields}
                   errorStyle={errorText}
                   {...input}
        />
    )
}