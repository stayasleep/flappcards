import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton';

class CardCreation extends Component {
    renderInput({input, label, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       {...input}
            />
        )
    }
    render() {
        const {handleSubmit, previousPage} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="Question" component={this.renderInput} label="Question"/>
                </div>
                <div>
                    <Field name="Answer" component={this.renderInput} label="Answer"/>
                </div>
                <div>
                </div>
                <div>
                    <RaisedButton type="button" className="previous" onClick={previousPage}>Previous</RaisedButton>
                    <RaisedButton type="button" className="addCard" label="Add Card"/>
                    <RaisedButton type="submit" className="next">Next</RaisedButton>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'stackCreate',              // <------ same form name
    destroyOnUnmount: false,     // <------ preserve form data
    validate
})(CardCreation)