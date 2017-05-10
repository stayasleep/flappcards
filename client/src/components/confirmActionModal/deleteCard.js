import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {deleteCard, getStackOverview} from '../../actions/index';
import {connect} from 'react-redux';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';

class DeleteCardConfirm extends React.Component {
    state = {
        open: false,
    };

    handleDelete(cardID){
        // this.props.cardID.card_id; the ID of the to be deleted
        this.props.deleteCard(cardID);
        this.props.getStackOverview(this.props.cardID.stack_id)
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
                label="Delete Card"
                primary={true}
                onTouchTap={this.handleClose}
                onClick={() => {this.handleDelete(this.props.cardID.card_id)}}
            />,
        ];

        const styles ={
            mediumIcon: {
                width: 48,
                height: 48
            },
            medium: {
                width: 96,
                height: 96,
                padding: 24
            }
        };

        return (
            <div>
                <IconButton iconStyle={styles.mediumIcon} style={styles.medium} tooltip="Delete" tooltipPosition="top-center" onTouchTap={this.handleOpen}>
                    <ActionDelete hoverColor={red500}/>
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

export default connect(null, {deleteCard, getStackOverview})(DeleteCardConfirm);