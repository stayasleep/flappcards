import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'
import renderInput from '../utilities/renderInputStackOV';
import { updateUserPassword } from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';


class ChangePassword extends Component{

    handleSubmit(values){
        console.log('change pw handle submit', values);
        this.props.updateUserPassword(values);
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit((values) => {this.handleSubmit(values)})}>
                    <Field name="password" label = "Password" type="password" component={renderInput} />
                    <Field name="passwordConfirm" label="Confirm Password" type="password" component={renderInput} />
                    <RaisedButton label="Submit" primary={true} type="submit" />
                    <RaisedButton label="Cancel" type="button" />
                </form>
            </div>
        )
    }
}
function validate(values){
    const errors ={};
    if(!values.password){
        errors.password = "Required";
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(values.password)){
        errors.password = "Password must be between 8 and 15 characters long";
    }
    if(!/^(?=.*[a-z])/i.test(values.password)){
        errors.password = "Password must include a lowercase letter";
    }
    if(!/^(?=.*[A-Z])/i.test(values.password)){
        errors.password = "Password must include an uppercase letter";
    }
    if(!/^(?=.*[0-9])/i.test(values.password)){
        errors.password = "Password must contain at least one (1) number";
    }
    if(!/^(?=.*[!@#\$%\^&\*])/i.test(values.password)){
        errors.password = "Password must include a special character (!,@,#,$,%,\,^,&)";
    }

    if(!values.passwordConfirm){
        errors.passwordConfirm ="Required";
    }else if(values.password !== values.passwordConfirm){
        errors.passwordConfirm = "Passwords do not match each other";
    }

    return errors;
}
ChangePassword = reduxForm({
    form: "changePassword",
    validate,
})(ChangePassword);

export default connect(null,{updateUserPassword})(ChangePassword);