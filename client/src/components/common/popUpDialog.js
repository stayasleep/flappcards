import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

//pop up notification specifying action performed to be from a logged in user only
const PopDialog = (props) =>{
    return(
        <Dialog
            title="Please login or register to continue!"
            titleClassName="popUpTitle"
            //actionsContainerClassName="loginContainer"
            bodyClassName="popUpBody"
            contentClassName={props.contentClass}
            overlayClassName={props.overlayClass}
            autoScrollBodyContent={false}
            open={props.stateIs}
            modal={false}
            onRequestClose={props.onClick}
        >
            <div className="popUpBtnContainer">
                <RaisedButton label="Login" primary={true} containerElement={<Link to={`/login`} name="login"/>} />
                <br/>
                <RaisedButton label="Register" style={{"boxShadow":"0 0 0 1pt rgb(0,121,107)"}} labelColor="rgb(0, 121, 107)" containerElement={<Link to={`/register`} name="register"/>} />
            </div>
        </Dialog>
    );
};

export default PopDialog;