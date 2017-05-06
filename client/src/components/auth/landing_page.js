import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router'
import Registration from './registration';

class landing extends Component {
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
        const styles = {
            title: {
                cursor: 'pointer',
            },
        };
        const loginStyle = {
            position: "relative",
            width: "70%",
            height: "100%"
        };
        const inputStyle = {
            height: "50%"
        };
        const mesgStyle = {
            textAlign: "center",
            fontSize: "4vh"
        };
        return (
            <div>
                <Toolbar>
                    <ToolbarTitle text="FlappCards" />
                    <form onSubmit={handleSubmit((values) => {this.handleLogin(values)})}>
                        <ToolbarGroup style={loginStyle}>
                            <ToolbarGroup style={inputStyle}>
                                <Field name="userName" component={this.renderInput} label="Username"/>
                                <Field name="password" component={this.renderInput} label="Password" type="password"/>
                            </ToolbarGroup>
                            <RaisedButton type="submit" label="Login"/>
                            <Link to="/Registration" name="Register"><RaisedButton label="Register"/></Link>
                        </ToolbarGroup>
                    </form>
                </Toolbar>
                <div>
                    <div style={mesgStyle}>
                        Create Cards to Study! Study Cards Made By Our Flappy Community!
                    </div>
                    <Registration/>
                </div>
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

landing = reduxForm({
    form: 'login',
    validate
})(landing);


export default connect(null, {userLogin})(landing);
