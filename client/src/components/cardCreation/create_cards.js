import React, {Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import {createStack} from '../../actions/index';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import renderInput from '../utilities/renderInput';
import Paper from 'material-ui/Paper';
import {cardToAdd, cardToAddForm, addCardList, addCardHeader, actionDeleteIconButton} from '../utilities/stackSummaryStyle';

import {medium, mediumIcon} from '../utilities/stackSummaryStyle';


class CreateCards extends Component {


    renderCards({fields, meta: {touched, error, submitFailed}}) {
        return (
            <ul style={addCardList}>
                <li>
                    <RaisedButton type="button" onClick={() => fields.push({})}>Add Card</RaisedButton>
                    {(touched || submitFailed) && error && <span>{error}</span>}
                </li>
                {fields.map((stack, index) => (
                    <Paper style={cardToAdd} key={index}>
                    <li>
                        <h4 style={addCardHeader}>
                        <IconButton iconStyle={mediumIcon} style={actionDeleteIconButton} tooltip="Remove Card" label="Remove Card" tooltipPosition="top-right" onTouchTap={()=> fields.remove(index)}>
                            <ActionDelete hoverColor={red500}/>
                        </IconButton>
                        </h4>

                        <Field
                            name={`${stack}.question`}
                            type="text"
                            component={renderInput}
                            label="Question"
                        />
                        <Field
                            name={`${stack}.answer`}
                            type="text"
                            component={renderInput}
                            label="Answer"
                        />
                    </li>
                    </Paper>
                ))}
            </ul>
        )
    }

    handleCreate(stackObject) {
        this.props.createStack(stackObject);
    }

    render() {
        const {handleSubmit, reset, pristine, submitting} = this.props;
        return (
            <div>
                <FlashCardsAppBar/>
                <Paper style={cardToAddForm}>
                <form onSubmit={handleSubmit((values) => {this.handleCreate(values)})}>
                    <Field
                        name="subject"
                        type="text"
                        component={renderInput}
                        label="Subject"
                    />
                    <Field
                        name="category"
                        type="text"
                        component={renderInput}
                        label="Category"
                    />
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