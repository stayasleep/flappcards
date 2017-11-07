import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {Field, reduxForm} from 'redux-form'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../../components/utilities/renderInputStackOV';
import {recoverPw, resetAuthRecovery} from '../../actions/index';



class ForgotForm extends Component {
    static contextTypes={
        router:PropTypes.object
    };
    constructor(props){
        super(props);
        this.state={
            time: 3,
            windowWidth: window.innerWidth,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.recoverPW){
            this.interval = setInterval(()=> this.sendMeHome(), 1000);
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval);
        console.log('will i be first or second');
        if(this.props.recoverPW || this.props.recoverErr){
            console.log('forgot form is unmonting and doing axios');
            this.props.resetAuthRecovery();
        }
    }

    handleRecoverPw(values){
        let credentials = {userName: values.userName.trim(), userEmail: values.userEmail.trim()};

        this.props.recoverPw(credentials);
    }

    sendMeHome(){
        if(this.state.time === 0){
            setTimeout(()=>{
                browserHistory.push("/login");
            }, 500);
        }else{
            this.setState({time: this.state.time -1});
        }
    }

    render(){
        const {windowWidth} = this.state;
        const {handleSubmit, submitting} = this.props;

        return (
            <div>
                {this.props.recoverErr &&
                    <div className="recoverForm" style={{color:"red"}}>{this.props.recoverErr}</div>
                }
                {this.props.recoverPW &&
                <div>
                    <p>
                        An email has been sent!  You will be redirected to the home page in <span className="timer" style={{fontWeight:700, fontSize:"1.5em",color:"red"}}>{this.state.time}</span> seconds...
                    </p>
                </div>
                }
                <form onSubmit={handleSubmit((values)=> this.handleRecoverPw(values))}>
                    <div className="fieldContainer">
                        <Field type="text" name="userName" label="Username" component={renderInput}/>
                        <Field type="email" name="userEmail" label="your@email.com" component={renderInput} />
                    </div>
                    <div className="logResetContainer">
                        <RaisedButton primary={true} type="submit" label="Recover" disabled={submitting || this.props.recoverPW} fullWidth={windowWidth<=480}/>
                    </div>
                </form>
            </div>
        )
    }
}
function validate(values){
    const errors = {};
    console.log('rforgot vals',values);

    const requiredFields = ['userName','userEmail'];

    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = `Required`
        }else if(/^\s+$/.test(values[field])){
            errors[field] = "Field must contain a value";
        }
    });


    return errors;
}

function mapStateToProps(state){
    return {
        recoverPW: state.auth.recoverPW,
        recoverErr: state.auth.authRecError,
    }
}
ForgotForm=reduxForm({
    form:'forgotPw',
    validate
})(ForgotForm);

export default connect(mapStateToProps, {recoverPw, resetAuthRecovery})(ForgotForm);