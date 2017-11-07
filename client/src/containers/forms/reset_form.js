import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import renderInput from '../../components/utilities/renderInputStackOV';
import CheckBoxOut from 'material-ui/svg-icons/navigation/check';
import RaisedButton from 'material-ui/RaisedButton';


class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            upper: "red",
            lower: "red",
            num: "red",
            special: "red",
            len: "red"
        }
    }
    componentWillReceiveProps(nextProps){
        //if you clear the form -> indicators need to be reset, otherwise they stay whatever color they were before the reset
        if(this.props.anyTouched !== nextProps.anyTouched){
            if(this.props.anyTouched){
                this.setState({
                    upper: "red",
                    lower: "red",
                    num: "red",
                    special: "red",
                    len: "red"
                });
            }
        }
        //Profile container imports this form and upon tab switch, we need to clear form
        if(nextProps.switchingTab){
            this.props.reset("resetPassword");
            this.setState({upper:"red",lower:"red",num:"red",special:"red",len:"red"}); //wonder if this could be done with a HOF and see what state is green
        }
    }
    //makes the checks go from red to green and back
    handleChange(event){
        if(event.target.value.length >= 8 && event.target.value.length <= 15){
            this.setState({len:"green"});
        }else if(event.target.value.length < 8 || event.target.value.length > 15){
            this.setState({len:"red"});
        }
        if(event.target.value && /^(?=.*[!@#\$%\^&\*])/i.test(event.target.value)){
            this.setState({special:"green"});
        }else if(!/^(?=.*[!@#\$%\^&\*])/i.test(event.target.value)){
            this.setState({special:"red"});
        }
        if(event.target.value && /^(?=.*[0-9])/i.test(event.target.value)){
            this.setState({num:"green"});
        }else if(!/^(?=.*[0-9])/i.test(event.target.value)){
            this.setState({num:"red"});
        }
        if(event.target.value && /[A-Z]/g.test(event.target.value)){
            this.setState({upper:"green"});
        }else if(!/[A-Z]/g.test(event.target.value)){
            this.setState({upper:"red"});
        }
        if(event.target.value && /[a-z]/g.test(event.target.value)){
            this.setState({lower:"green"});
        }else if(!/[a-z]/g.test(event.target.value)){
            this.setState({lower:"red"});
        }
    }
    //pass the new values back to the parent via props
    handleSubmit(values){
        this.props.onPasswordSubmit(values);
        this.setState({
            upper:"red",
            lower:"red",
            num:"red",
            special:"red",
            len:"red"
        });
        this.props.reset('resetPassword');
        //Future notice: upon submitting, the fields clear, user gets a notification, but the focus is still on the second input field with REQUIRED in red
    }


    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div>
                <div className="changeContainer">
                    <h2>Remember, New Password Must Contain:</h2>
                    <div className="passwordReqs">
                        <div className="reqOne"><CheckBoxOut color={this.state.upper}/>At least one (1) uppercase letter</div>
                        <div className="reqTwo"><CheckBoxOut color={this.state.lower}/>At least one (1) lowercase letter</div>
                        <div className="reqThree"><CheckBoxOut color={this.state.num}/>At least one (1) number</div>
                        <div className="reqFour"><CheckBoxOut color={this.state.special}/>At least one (1) special character</div>
                        <div className="reqFive"><CheckBoxOut color={this.state.len}/>Must be between 8 and 15 characters</div>
                    </div>
                    <form onSubmit={handleSubmit((values) => {this.handleSubmit(values)})}>
                        <div className="passwordContainer">
                            <Field name="password" label = "Password" type="password" component={renderInput} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="confirmContainer">
                            <Field name="passwordConfirm" label="Confirm Password" type="password" component={renderInput} />
                        </div>
                        <div className="profileBtnContainer">
                            <RaisedButton className="passSubmit" label="Submit" primary={true} type="submit" fullWidth={true} disabled={pristine || submitting || this.props.resetPW} />
                            <RaisedButton style={{boxShadow:"0 0 0 1pt rgb(0,121,107)"}} className="passClear" label="Clear" type="button" labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" fullWidth={true} onClick={reset} disabled={pristine || submitting || this.props.resetPW} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(values){
    const errors = {};

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

ResetPassword=reduxForm({
    form:'resetPassword',
    validate,
})(ResetPassword);

export default connect(null,{})(ResetPassword);