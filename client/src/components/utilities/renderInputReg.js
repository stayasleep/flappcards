import React from 'react';
import TextField from 'material-ui/TextField';

export default function renderInputReg({input, label, type, meta: {touched, dirty, active, error}}) {
    return (
        <TextField hintText={label}
                   floatingLabelText={label}
                   floatingLabelStyle={{color: "teal"}}
                   errorText={touched && !active && dirty && error}
                   //errorStyle={{float: "left"}}
                   type={type}
                   {...input}
        />
    )
}

