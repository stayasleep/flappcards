import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';


class EditCard extends Component {
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

    state = {
        open: false,
    };

    handleDelete(id){
        this.props.deleteCard(id)
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render() {
        const actions = [
            <RaisedButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label="Yes"
                primary={true}
                onTouchTap={this.handleClose}
                onClick={() => {this.handleDelete(this.props.cardID)}}
            />,
        ];

        const { handleSubmit } = this.props;
        return (
            <div>
                <RaisedButton label="Edit" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Are You Sure?"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field name="Question" component={this.renderInput} label="Question"/>
                        </div>
                        <div>
                            <Field name="Answer" component={this.renderInput} label="Answer"/>
                        </div>
                        <div>
                            <RaisedButton type="submit" className="submit">Submit</RaisedButton>
                        </div>
                    </form>
                </Dialog>
            </div>
        )
    }
}

EditCard = reduxForm({
    form: 'EditCard',
    validate
})(EditCard);

export default EditCard;