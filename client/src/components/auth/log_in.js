import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'
import {browserHistory} from 'react-router';

class LogIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleLogin(values) {
        // Action creator userLogin sends an axios call to the server
       this.props.userLogin(values);
    }
    //TODO move renderInput into a separate common utilities folder?

    renderInput({input, label, type, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       type={type}
                       {...input}
            />
        )
    }

    render (){
        const { handleSubmit } = this.props;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit((values) => {this.handleLogin(values)})}>
                    <div>
                        <Field name="userName" component={this.renderInput} label="Username"/>
                    </div>
                        <Field name="password" component={this.renderInput} label="Password" type="password"/>
                    <div>
                        <RaisedButton type="submit" label="Login"/>
                        <Link to="/Registration"> <RaisedButton type="button" label="Register"/></Link>
                    </div>

                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    const requiredFields = [ 'userName', 'password'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[field] = `Required`
        }
    });
    
    return errors
}

LogIn = reduxForm({
    form: 'login',
    validate
})(LogIn);


export default connect(null, {userLogin})(LogIn);
