import React, {Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import {createStack} from '../../actions/index';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';




class CreateCards extends Component {

    constructor(props){
        super(props);
        // bind this so renderInput is defined for renderCards
        this.renderInput = this.renderInput.bind(this);
        this.renderCards = this.renderCards.bind(this);
    }

    renderInput({input, label, type, meta: {touched, error}}) {
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       type={type}
                       {...input}
            />
        )
    }

    renderCards({fields, meta: {touched, error, submitFailed}}) {
        return (
            <ul>
                <li>
                    <RaisedButton type="button" onClick={() => fields.push({})}>Add Card</RaisedButton>
                    {(touched || submitFailed) && error && <span>{error}</span>}
                </li>
                {fields.map((stack, index) => (
                    <li key={index}>
                        <RaisedButton
                            type="button"
                            title="Remove Card"
                            onClick={() => fields.remove(index)}
                            label="Remove Card"
                        />
                        <h4>Card #{index + 1}</h4>
                        <Field
                            name={`${stack}.question`}
                            type="text"
                            component={this.renderInput}
                            label="Question"
                        />
                        <Field
                            name={`${stack}.answer`}
                            type="text"
                            component={this.renderInput}
                            label="Answer"
                        />
                    </li>
                ))}
            </ul>
        )
    }

    handleCreate(stackObject) {
        console.log("handleCreate function called; stackObject:", stackObject);
        this.props.createStack(stackObject);
    }

    render() {
        const {handleSubmit, reset, pristine, submitting} = this.props;
        return (
            <div>
                <FlashCardsAppBar/>
                <form onSubmit={handleSubmit((values) => {this.handleCreate(values)})}>
                    <Field
                        name="subject"
                        type="text"
                        component={this.renderInput}
                        label="Subject"
                    />
                    <Field
                        name="category"
                        type="text"
                        component={this.renderInput}
                        label="Category"
                    />
                    <FieldArray name="stack" component={this.renderCards} />
                    <div>
                        <RaisedButton type="submit" disabled={submitting}>Submit</RaisedButton>
                        <RaisedButton type="button" disabled={pristine || submitting} onClick={reset}>
                            Remove All
                        </RaisedButton>
                    </div>
                </form>
            </div>
        );
    }
}


CreateCards = reduxForm({
    form: 'createStack', // a unique identifier for this form
    validate,
})(CreateCards);

export default connect(null, {createStack})(CreateCards);