import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {userLogin} from '../actions/index';


class LogIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleLogin(values) {
        console.log('values', values);
        // this.props.userLogin(values).then(() => {
        //     this.context.router.push('/');
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
                <form onSubmit={handleSubmit((formValues) => {this.handleLogin(formValues)})}>
                    <div>
                        <Field name="userName" component={this.renderInput} label="Username"/>
                    </div>
                        <Field name="password" component={this.renderInput} label="Password"/>
                    <div>
                        <RaisedButton label="Login"/>
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


export default connect(null, {})(LogIn);
