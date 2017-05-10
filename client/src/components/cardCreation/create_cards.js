import React, {Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import {createStack} from '../../actions/index';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {browserHistory} from 'react-router'
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import renderInput from '../utilities/renderInput';


class CreateCards extends Component {


    renderCards({fields, meta: {touched, error, submitFailed}}) {
        const styles = {
            listStyleType: "none",
            mediumIcon: {
                width: "48px",
                height: "48px"
            },
            medium: {
                width: "96px",
                height: "96px",
                padding: "24px"
            }
        };
        return (
            <ul style={{listStyleType: "none"}}>
                <li>
                    <RaisedButton type="button" onClick={() => fields.push({})}>Add Card</RaisedButton>
                    {(touched || submitFailed) && error && <span>{error}</span>}
                </li>
                {fields.map((stack, index) => (
                    <li key={index}>

                        <h4 style={{fontFamily: "Roboto, sans-serif"}}>Card #{index + 1}
                        <IconButton iconStyle={`${styles.mediumIcon}`} style={`${styles.medium}`} tooltip="Remove Card" label="Remove Card" tooltipPosition="top-right" onTouchTap={()=> fields.remove(index)}>
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
                ))}
            </ul>
        )
    }

    handleCreate(stackObject) {
        console.log("handleCreate function called; stackObject:", stackObject);
        this.props.createStack(stackObject);
        if(stackObject){
            browserHistory.push("/stackOverview")
        }
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
            </div>
        );
    }
}


CreateCards = reduxForm({
    form: 'createStack', // a unique identifier for this form
    validate,
})(CreateCards);

export default connect(null, {createStack})(CreateCards);