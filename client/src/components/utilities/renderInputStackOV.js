import React from 'react';
import TextField from 'material-ui/TextField';

export default function renderInputReg({className, input, label, type, value, meta: {touched, dirty, active, error}}) {
    return (
        <TextField hintText={label}
                   className={className}
                   floatingLabelText={label}
                   floatingLabelStyle={{color: "teal"}}
                   //errorText={touched && !active && dirty && error}
                   errorText={touched && (error && <span className="errorMsg">{error}</span>)}
                   //errorStyle={{float: "left"}}
                   type={type}
                   value={value}
                   {...input}
        />
    )
}

