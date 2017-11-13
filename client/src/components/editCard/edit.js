import React, {Component} from 'react'
import { Field, reduxForm, reset } from 'redux-form';
import renderInput from '../utilities/renderInput';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import {cardEditor} from '../../actions/index';
import {blue500} from 'material-ui/styles/colors';
import {editIconButton} from '../utilities/stackSummaryStyle';

const styler = {
    center: {
        textAlign: "center"
    }
};

class EditCard extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        open: false,
    };
    handleEdit(cardObject){
        cardObject.editA = cardObject.editA.trim();
        cardObject.editQ = cardObject.editQ.trim();

        let editObject = {...cardObject, cardID: this.props.cardID, stackID:this.props.stackID};
        // Pull the card_id and stack_id for the(database)
        this.props.cardEditor(editObject);
        this.setState({open:false});
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.props.reset('EditCards');
        this.setState({open: false});
    };



    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <EditorModeEdit style={editIconButton} label="Edit"  hoverColor={blue500} onTouchTap={this.handleOpen} />
                <Dialog
                    style={styler.center}
                    title="Are you sure you want to edit this card?"
                    modal={true}
                    open={this.state.open}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >
                    <form onSubmit={handleSubmit((values) => {this.handleEdit(values)})} >
                        <div>
                            <Field name="editQ" component={renderInput} label="Question"/>
                        </div>
                        <div>
                            <Field name="editA" component={renderInput} label="Answer"/>
                        </div>
                        <div>
                            <p>Original Question: {this.props.initialValues.editQ}</p>
                            <p>Original Answer: {this.props.initialValues.editA}</p>
                        </div>
                        <RaisedButton style={{"boxShadow":"0 0 0 1pt rgb(0,121,107)","margin":"2em"}} labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" type="button" label="Cancel" onTouchTap={this.handleClose}/>
                        <RaisedButton style={{"margin":"2em"}} label="Edit" primary={true} type="submit"/>
                    </form>
                </Dialog>
            </div>
        )
    }
}
function validate(values){
    const errors = {};
    if(!values.editQ){
        errors.editQ = "Required";
    }
    if(!values.editA){
        errors.editA = "Required";
    }
    
    if(values.editQ && /^\s+$/.test(values.editQ)){
        errors.editQ = "Question must have a value";
    }
    if(values.editA && /^\s+$/.test(values.editA)){
        errors.editA = "Question must have a value";
    }
    if(values.editQ.length > 400){
        errors.editQ = "Question must be less than 400 characters";
    }
    if(values.editA.length > 400){
        errors.editA = "Answer must be less than 400 characters";
    }
    return errors;
}

EditCard = reduxForm({
    form: 'EditCards',
    enableReinitialize: true,
    overwriteOnInitialValuesChange: false,
    validate
})(EditCard);

function mapStateToProps(state,ownProps) {
    return {
        form: `EditCards${ownProps.formKey}`,
    }
}

export default connect(mapStateToProps,{cardEditor})(EditCard);


