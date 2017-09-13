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
import {removeAll, cardToAdd, cardToAddForm, addCardList, closeIconButton, addCardInputFields, cardToAddSubjectCategory} from '../utilities/stackSummaryStyle';
import Close from 'material-ui/svg-icons/navigation/close';
import {labelPlaceholder} from './../styles/inputComponent.css';


class CreateCards extends Component {

    componentWillMount(){
        document.title="FlappCards - Create A Study Stack!";
    }

    componentWillUnmount(){
        document.title="FlappCards";

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
        console.log('create form', stackObject);
        this.props.createStack(stackObject);
    }

    render() {
        const {handleSubmit, reset, pristine, submitting} = this.props;
        return (
            <div>
                <FlashCardsAppBar/>
                <Paper className="createCardPaper" style={cardToAddForm}>
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
                    <div className="createCardsButtons">
                        <button type="submit" className="formBtn purpBtn" disabled={pristine || submitting}>Submit</button>
                        <button style={removeAll} type="button" className="formBtn grayBtn " disabled={pristine || submitting} onClick={reset} >Remove All</button>
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