import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ForgotForm from '../../containers/forms/forgot_form';
import { resetAuthRecovery } from '../../actions/index';

const styles = {
    center: {
        textAlign: "center",
    },
    button: {
        color: "teal"
    },
    cancelBtn:{
        color:"rgb(0, 121, 107)",
        boxShadow:"0 0 0 1pt rgb(0, 121, 107)",
    },
    margin: {
      margin: "1em"
    }
};

class RecoverPw extends React.Component{
    state = {
        //loginModal: true,
        recoveryModal: false,
    };


    handleOpen = (e) =>{
        e.preventDefault();
        this.setState({
            recoveryModal:true
        });
    };
    handleClose = () =>{
        //close the recovery form and reset recovery error
        this.setState({
            recoveryModal: false
        });
        console.log('happens first');
        this.props.resetAuthRecovery();
    };

    handleRecoverModalClose(){
        console.log('recovery email sent, closing modal');
        this.setState({recoveryModal: false});
    }
    render(){
        console.log('render for recoverPW dialog',this.props);

        return(
            <div style={styles.margin}>
                <a style = {styles.button} href="" onClick={this.handleOpen}>Forgot Password?</a>
                <Dialog
                    title="Reset Password"
                    autoScrollBodyContent={true}
                    modal={true}
                    open={this.state.recoveryModal}
                    style={styles.center}
                >
                    <h3>Please enter the requested information.</h3>
                    <h4>After submission, an email will be sent to the specified email address.</h4>

                    <ForgotForm dialog={true} handleRecoverModalClose={this.handleRecoverModalClose.bind(this)}/>
                    <FlatButton
                        style={styles.cancelBtn}
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                        disabled={this.props.recoverPW}
                    />
                </Dialog>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        recoverPW: state.auth.recoverPW,
    }
}
export default connect(mapStateToProps,{ resetAuthRecovery })(RecoverPw);