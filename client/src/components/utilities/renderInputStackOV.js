import React from 'react';
import TextField from 'material-ui/TextField';

export default function renderInputReg({className, input, label, type, value, meta: {touched, dirty, active, error}}) {
    return (
        <TextField
            className={className}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            floatingLabelText={label}
            floatingLabelStyle={{color: "teal"}}
            hintText={label}
            //errorStyle={{float: "left"}}
            type={type}
            {...input}
        />
    )
}

