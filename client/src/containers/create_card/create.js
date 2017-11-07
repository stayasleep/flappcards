import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {red500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Close from 'material-ui/svg-icons/navigation/close';
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import renderInput from '../../components/utilities/renderInput'; //this one has css that prevents the textfield from going nuts. arg
import renderInputCreateCard from '../../components/utilities/renderInputCreateCard';
import { createStack } from '../../actions/index';
import validate from '../../components/cardCreation/validate';
import {removeAll, cardToAdd, cardToAddForm, addCardList, closeIconButton, addCardInputFields, cardToAddSubjectCategory} from '../../components/utilities/stackSummaryStyle';

import  './../../components/styles/inputComponent.css';



class CreateStack extends Component {

    componentWillMount(){
        document.title="FlappCards - Create Your Stack!";
    }
    renderCards({fields, meta: {touched, error, submitFailed}}) {
        return (
            <ul style={addCardList}>
                {fields.map((stack, index) => (
                    <Paper style={cardToAdd} key={index}>
                        <li>
                            <Close style={closeIconButton} label="Remove Card" onTouchTap={()=> fields.remove(index)} hoverColor={red500}/>
                            <div className="qAndA" style={addCardInputFields}>
                                <Field
                                    name={`${stack}.question`}
                                    type="text"
                                    component={renderInputCreateCard}
                                    label="Question"
                                    className="labelPlaceholder"
                                    errorText={touched && error}
                                    fullWidth={true}
                                />
                                <Field
                                    name={`${stack}.answer`}
                                    type="text"
                                    component={renderInputCreateCard}
                                    label="Answer"
                                    errorText={touched && error}
                                    fullWidth={true}

                                />
                            </div>
                        </li>
                    </Paper>
                ))}
                <li style={{float: "right"}}>
                    <button className="btnAddCard addBtn" type="button" onClick={() => fields.push({})} >Add Card</button>
                    {(touched || submitFailed) && error && <span>{error}</span>}
                </li>
            </ul>
        )
    }

    handleCreate(stackObject) {
        //trim white space from the obj and the stack array
        stackObject.subject = stackObject.subject.trim();
        stackObject.category = stackObject.category.trim();
        stackObject.stack.forEach((card,index) => {
            card.question = card.question.trim();
            card.answer = card.answer.trim();
        });
        this.props.createStack(stackObject);
    }

    render(){
        const {handleSubmit, reset, pristine, submitting} = this.props;

        return(
            <div>
                <FlashCardsAppBar/>
                <Paper className="createCardPaper" style={cardToAddForm}>
                    <form onSubmit={handleSubmit((values) => {this.handleCreate(values)})}>
                        <div style={cardToAddSubjectCategory}>
                            <Field
                                name="subject"
                                type="text"
                                component={renderInput}
                                label="Subject"
                                className="inputField"

                            />
                            <Field
                                name="category"
                                type="text"
                                component={renderInput}
                                label="Category"
                            />
                        </div>
                        <FieldArray name="stack" component={this.renderCards} />
                        <div className="createCardsButtons">
                            <button type="submit" className="formBtn purpBtn" disabled={pristine || submitting}>Submit</button>
                            <button style={removeAll} type="button" className="formBtn grayBtn " disabled={pristine || submitting} onClick={reset} >Remove All</button>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}

CreateStack=reduxForm({
    form:'createStack',
    validate,
})(CreateStack);

export default connect(null, {createStack})(CreateStack);