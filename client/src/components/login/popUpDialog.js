import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'



//the popup a user will see if they try to perform an action that requires them to be logged in first
export default class PopDialog extends React.Component{

    //parent component passes function as prop so we can close dialog
    handleClose(){
        this.props.onClick();
    };

    render(){
        console.log('temp dialoog');

        return(
                <Dialog
                    title="Please login or register to continue!"
                    titleClassName="popUpTitle"
                    actionsContainerClassName="loginContainer"
                    bodyClassName="popUpBody"
                    contentClassName="miniLoginContent"
                    overlayClassName="miniLogInOverlay"
                    autoScrollBodyContent={false}
                    open={this.props.stateIs}
                    modal={false}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    <div className="popUpBtnContainer">
                        <RaisedButton label="Login" primary={true} containerElement={<Link to={`/login`} name="login"/>} />
                        <br/>
                        <RaisedButton label="Register" style={{"boxShadow":"0 0 0 1pt rgb(0,121,107)"}} labelColor="rgb(0, 121, 107)" containerElement={<Link to={`/register`} name="register"/>} />
                    </div>
                </Dialog>
        );
    }
};

