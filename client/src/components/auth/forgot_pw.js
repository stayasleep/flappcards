import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {recoverPw} from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../utilities/renderInput';


const styles = {
    center: {
        textAlign:"center",
        margin:"1em"
    }
};

class ForgotPw extends Component{
    static contextTypes = {
        router: PropTypes.object
    } ;
    handleResetAuth(values){
        //Action creator recoverPw sends an axios call to the server
        this.props.recoverPw(values);
    }

    render (){
        console.log('my prop',this.props);
        const {handleSubmit, error, submitting, submitSucceeded} = this.props;
        return (
            <div>
                <div id="recoverForm">
                    {this.props.errRecovery ? (
                            <div style={{"color":"red"}}>{this.props.errRecovery}</div>
                        ) : null}
                </div>
                <form onSubmit={handleSubmit((values)=>{this.handleResetAuth(values)})}>
                    <div style={styles.center}>
                        <div style={styles.center}>
                        <Field name="userName" component={renderInput} label="Username"/>
                        </div>
                        <div style={styles.center}>
                            <Field name="userEmail" component={renderInput} label="Email" type="email"/>
                        </div>
                        <RaisedButton primary={true} type="submit" label="Recover" disabled={this.props.disabled || submitting} fullWidth={this.props.fullBar}/>
                    </div>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    const requiredFields = ['userName','userEmail'];
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = `Required`
        }
    });

    return errors
}

function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated,
        errForgotPw: state.auth.authError,
        errRecovery: state.auth.authRecError,
    };
}

ForgotPw = reduxForm({
    form:'login',
    validate
})(ForgotPw);

export default connect(mapStateToProps,{recoverPw})(ForgotPw);