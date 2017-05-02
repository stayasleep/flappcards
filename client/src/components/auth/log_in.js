import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

class LogIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleLogin(values) {
        console.log('values from handleLogin function', values);
        this.props.userLogin(values).then(() => {
            this.context.router.push('/home');
        });
    }

    renderInput({input, label, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
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
                        <Link to="/Registration" name="Register"><RaisedButton label="Register"/></Link>
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
