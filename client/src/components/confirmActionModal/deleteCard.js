import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {deleteCard} from '../../actions/index';
import {connect} from 'react-redux';
import ActionDelete from 'material-ui/svg-icons/action/delete';


class DeleteCardConfirm extends React.Component {
    state = {
        open: false,
    };

    handleDelete(cardID){
        // this.props.cardID.card_id; the ID of the to be deleted
        this.props.deleteCard(cardID);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Remove Card"
                primary={true}
                onTouchTap={this.handleClose}
                onClick={() => {this.handleDelete(this.props.cardID.card_id)}}
            />,
        ];

        return (
            <div>
                <IconButton tooltip="Delete" tooltipPosition="top-right" onTouchTap={this.handleOpen}>
                    <ActionDelete/>
                </IconButton>
                <Dialog
                    title="Are you sure you want to remove this card from the stack?"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {deleteCard})(DeleteCardConfirm);