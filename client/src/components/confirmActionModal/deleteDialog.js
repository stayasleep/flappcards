import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const DeleteDialog =(props) => {
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={props.handleClose}
        />,
        <FlatButton
            label={props.confirmTitle}
            primary={true}
            onTouchTap={props.handleDelete}
        />,
    ];
    return (
        <Dialog
            style={{textAlign: "center"}}
            title={props.title}
            actions={actions}
            modal={true} //must click to escape dialog
            open={props.open}
        >
        </Dialog>
    )
};

export default DeleteDialog;