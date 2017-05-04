import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {deleteStack} from '../../actions/index';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class DeleteStackConfirm extends React.Component {

    state = {
        open: false,
    };

    handleDelete(id){
        this.props.deleteStack(id)
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
                label="Yes"
                primary={true}
                onTouchTap={this.handleClose}
                onClick={() => {this.handleDelete(this.props.stacks._id)}}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Delete" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Are You Sure?"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {deleteStack})(DeleteStackConfirm);