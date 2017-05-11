import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../utilities/renderInput';

const styles = {
    center: {
        textAlign: "center",
        margin: "1em"
    }
};

class LogIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleLogin(values) {
        // Action creator userLogin sends an axios call to the server
       this.props.userLogin(values);
    }

    render (){
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit((values) => {this.handleLogin(values)})}>
                    <div style={styles.center}>
                        <div style={styles.center}>
                        <Field name="userName" component={renderInput} label="Username"/>
                        </div>
                        <div style={styles.center}>
                        <Field name="password" component={renderInput} label="Password" type="password"/>
                        </div>
                        <RaisedButton type="submit" label="Login"/>
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
