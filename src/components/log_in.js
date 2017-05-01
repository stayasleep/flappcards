import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'


class LogIn extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    login(values) {
        console.log("login function triggered: here are the values", values);
        this.props.userLogin(values).then(() => {
            this.context.router.push('/Home');
        });
        console.log("this.props.userLogin(values)", this.props.userLogin(values));
    }

    renderInput({input, label, type, meta: { touched, error } }) {
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       {...input}
            />
        )
    }

    render() {
        const { handleSubmit } = this.props; // equivalent to this.props.handleSubmit
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit ={handleSubmit((formValues) => { this.login(formValues)})}>
                    <div className="form-group">
                        <Field name="username" component={this.renderInput} type="text" className="form-control" label="Username"/>
                    </div>
                    <div className="form-group">
                        <Field name="password"  component={this.renderInput} type="password" className="form-control" label="Password"/>
                    </div>
                    <br/>
                    <RaisedButton onClick={(formValues) => this.login(formValues)}>Login</RaisedButton>
                    <Link to="/Registration" name="Register"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Register</button></Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = "Username required";
    }
    if (!values.password) {
        errors.password = "Password required";
    }

    return errors;
}

LogIn = reduxForm({
    form: 'loginForm',
    validate
})(LogIn);

export default connect(null, {userLogin})(LogIn);