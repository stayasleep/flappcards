import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ForgotPw from '../auth/forgot_pw';

const styles = {
    center: {
        textAlign: "center",
    },
    button: {
        marginTop: 6,
        marginRight: 20
    },
    cancelBtn:{
        color:"rgb(0, 121, 107)",
        boxShadow:"0 0 0 1pt rgb(0, 121, 107)",
    }
};

export default class RecoverPw extends React.Component{
    state = {
        open: false,
    };
    handleOpen = () =>{
        this.setState({open:true});
    };
    handleClose = () =>{
        this.setState({open: false});
    };

    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return(
            <div>
                <RaisedButton style = {styles.button} label="Forgot Password" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Reset Password"
                    autoScrollBodyContent={true}
                    modal={true}
                    open={this.state.open}
                    style={styles.center}
                >
                    <ForgotPw/>
                    <FlatButton
                        style={styles.cancelBtn}
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                    />
                </Dialog>
            </div>
        )
    }
}
