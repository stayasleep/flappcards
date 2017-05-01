import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

class Registration extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    renderInput({input, label, type, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       {...input}
            />
        )
    }

    render (){
        const {handleSubmit, reset} = this.props;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="name" component={this.renderInput} type="text" label="First and Last Name"/>
                    </div>
                    <div>
                        <Field name="userName" component={this.renderInput} type="text" label="Username"/>
                    </div>
                    <div>
                        <Field name="password" component={this.renderInput} type="text" label="Password"/>
                    </div>
                    <div>
                        <Field name="email" component={this.renderInput} type="text" label="Email"/>
                    </div>
                    <div>
                        <Field name="birthday" component={this.renderInput} type="text" label="Birthday"/>
                    </div>
                    <div>
                        <RaisedButton label="Submit"/>
                        <RaisedButton type="button" onClick={reset}>Clear Values</RaisedButton>
                    </div>
                </form>
                <Link to="/Login" name="Log In"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Return</button></Link>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    const requiredFields = [ 'name', 'userName', 'password', 'email', 'birthday' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

Registration = reduxForm({
    form: 'Registration',
    validate
})(Registration);

export default connect(null, {})(Registration)