import React from 'react';
import TextField from 'material-ui/TextField';

export default function renderInputReg({input, label, type, value, meta: {touched, dirty, active, error}}) {
    return (
        <TextField hintText={label}
                   floatingLabelText={label}
                   floatingLabelStyle={{color: "teal"}}
                   //errorText={touched && !active && dirty && error}
                   errorText={touched && (error && <span>{error}</span>)}
                   errorStyle={{float: "left"}}
                   type={type}
                   value={value}
                   {...input}
        />
    )
}

