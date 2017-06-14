import React, {Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import {createStack} from '../../actions/index';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {red500} from 'material-ui/styles/colors';
import renderInputCreateCard from '../utilities/renderInputCreateCard';
import Paper from 'material-ui/Paper';
import {cardToAdd, cardToAddForm, addCardList, closeIconButton, addCardInputFields, cardToAddSubjectCategory} from '../utilities/stackSummaryStyle';
import Close from 'material-ui/svg-icons/navigation/close';
import {labelPlaceholder} from './../styles/inputComponent.css';


class CreateCards extends Component {


    renderCards({fields, meta: {touched, error, submitFailed}}) {
        return (
            <ul style={addCardList}>
                {fields.map((stack, index) => (
                    <Paper style={cardToAdd} key={index}>
                    <li>
                        <Close style={closeIconButton} label="Remove Card" onTouchTap={()=> fields.remove(index)} hoverColor={red500}/>
                        <div style={addCardInputFields}>
                        <Field
                            name={`${stack}.question`}
                            type="text"
                            component={renderInputCreateCard}
                            label="Question"
                            className="labelPlaceholder"

                        />
                        <Field
                            name={`${stack}.answer`}
                            type="text"
                            component={renderInputCreateCard}
                            label="Answer"
                        />
                        </div>
                    </li>
                    </Paper>
                ))}
                <li style={{float: "right"}}>
                    <RaisedButton type="button" onClick={() => fields.push({})}>Add Card</RaisedButton>
                    {(touched || submitFailed) && error && <span>{error}</span>}
                </li>
            </ul>
        )
    }

    handleCreate(stackObject) {
        debugger;
        this.props.createStack(stackObject);
    }

    render() {
        const {handleSubmit, reset, pristine, submitting} = this.props;
        return (
            <div>
                <FlashCardsAppBar/>
                <Paper style={cardToAddForm}>
                <form onSubmit={handleSubmit((values) => {this.handleCreate(values)})}>
                    <div style={cardToAddSubjectCategory}>
                            <Field
                                name="subject"
                                type="text"
                                component={renderInputCreateCard}
                                label="Subject"
                                className="inputField"
                            />
                            <Field
                                name="category"
                                type="text"
                                component={renderInputCreateCard}
                                label="Category"
                            />
                    </div>
                    <FieldArray name="stack" component={this.renderCards} />
                    <div>
                        <RaisedButton type="submit" label="Submit" disabled={pristine || submitting}/>
                        <RaisedButton type="button" label="Remove All" disabled={pristine || submitting} onClick={reset}/>
                    </div>
                </form>
                </Paper>
            </div>
        );
    }
}


CreateCards = reduxForm({
    form: 'createStack', // a unique identifier for this form
    validate,
})(CreateCards);

export default connect(null, {createStack})(CreateCards);