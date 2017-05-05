import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';

class StackCreation extends Component {
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

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="Subject" component={this.renderInput} label="Subject"/>
                </div>
                <div>
                    <Field name="Category" component={this.renderInput} label="Category"/>
                </div>
                <div>
                    <RaisedButton type="submit" className="next">Next</RaisedButton>
                </div>
            </form>
        )
    }
}

StackCreation = reduxForm({
    form: 'stackCreate',              // <------ same form name
    destroyOnUnmount: false,         // <------ preserve form data
    validate
})(StackCreation);

export default connect(null, {})(StackCreation);