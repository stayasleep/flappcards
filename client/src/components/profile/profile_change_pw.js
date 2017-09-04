import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'
import renderInput from '../utilities/renderInputStackOV';
import { updateUserPassword, clearUserPasswordNotice } from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


class ChangePassword extends Component{

    handleSubmit(values){
        console.log('change pw handle submit', values);
        this.props.updateUserPassword(values);
        this.props.reset("changePassword");
    }

    handleRequestClose(){
        this.props.clearUserPasswordNotice();
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="changeContainer">
                <form onSubmit={handleSubmit((values) => {this.handleSubmit(values)})}>
                    <div className="passwordContainer">
                        <Field name="password" label = "Password" type="password" component={renderInput} />
                    </div>
                    <div className="confirmContainer">
                        <Field name="passwordConfirm" label="Confirm Password" type="password" component={renderInput} />
                    </div>
                    <div className="profileBtnContainer">
                        <div className="passSubmitContainer">
                            <RaisedButton className="passSubmit" label="Submit" primary={true} type="submit" fullWidth={false} />
                        </div>
                        <div className="passClearContainer">
                            <RaisedButton className="passClear" label="Clear" type="button" fullWidth={false} />
                        </div>
                    </div>
                </form>
                {this.props.updated ? (
                    <div>
                        <Snackbar
                            open={this.props.updated}
                            message={"Password has been updated and will take into effect the next time you log in"}
                            autoHideDuration={5000}
                            onRequestClose={this.handleRequestClose.bind(this)}
                            action="Close"
                        />
                    </div>
                    ) : (
                        null
                    )
                }
                {this.props.errTxt.error ? (
                    <div>
                        <Snackbar
                            open={this.props.errTxt.error}
                            message={this.props.errTxt.message}
                            autoHideDuration={10000}
                            onRequestClose={this.handleRequestClose.bind(this)}
                            action="Close"
                        />
                    </div>
                    ) : (
                        null
                    )
                }
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
        errors.password = "Password must be between 8 and 15 characters long & contain a special character";
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

export default connect(null,{updateUserPassword, clearUserPasswordNotice})(ChangePassword);