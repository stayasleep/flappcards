import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {deleteStack, getMyStackOverview} from '../../actions/index';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';

const styler = {
    center: {
        textAlign: "center"
    }
};

class DeleteStackConfirm extends React.Component {

    state = {
        open: false,
    };

    handleDelete(stackObject){
        this.props.deleteStack(stackObject);
        //this.props.getMyStackOverview();
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
                label="Delete Stack"
                primary={true}
                onTouchTap={this.handleClose}
                onClick={() => {this.handleDelete(this.props.stackID)}}
            />,
        ];

        return (
            <div>
                <IconButton label="Delete" onTouchTap={this.handleOpen}>
                    <ActionDelete hoverColor={red500}/>
                </IconButton>
                <Dialog
                    style={styler.center}
                    title="Are you sure you want to delete this stack?"
                    actions={actions}
                    modal={true}
                    actionsContainerStyle={styler.center}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {deleteStack, getMyStackOverview})(DeleteStackConfirm);