import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'
import renderInput from '../utilities/renderInputStackOV';
import { updateUserPassword, clearUserPasswordNotice } from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import CheckBoxOut from 'material-ui/svg-icons/navigation/check';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';


class ChangePassword extends Component{
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
        console.log('these enxt ptops bb',nextProps);
        if(nextProps.shouldReset){
            this.props.reset("changePassword");
            this.setState({upper:"red",lower:"red",num:"red",special:"red",len:"red"}); //wonder if this could be done with a HOF and see what state is green
        }
    }

    handleSubmit(values){
        if(Object.keys(values).length !== 2){
            return event.preventDefault();
        }
        this.props.updateUserPassword(values);
        this.props.reset("changePassword");
        this.setState({
            upper:"red",
            lower:"red",
            num:"red",
            special:"red",
            len:"red"
        })
    }

    handleRequestClose(){
        this.props.clearUserPasswordNotice();
    }

    handleChange(event){
        console.log('handle change',event.target.value);
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

    render(){
        const { handleSubmit, reset } = this.props;
        return (
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
                        <div className="passSubmitContainer">
                            <RaisedButton className="passSubmit" label="Submit" primary={true} type="submit" fullWidth={true} />
                        </div>
                        <div className="passClearContainer">
                            <RaisedButton className="passClear" label="Clear" type="button" labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" fullWidth={true} onClick={reset} />
                        </div>
                    </div>
                </form>
                {this.props.updated ? (
                    <div>
                        <Snackbar
                            open={this.props.updated}
                            message={"New Password will take into effect the next time you log in"}
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
    console.log('val',values);
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