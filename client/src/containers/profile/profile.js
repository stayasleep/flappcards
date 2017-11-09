import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { Tab, Tabs } from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';

import FlashCardAppBar from '../../components/appBar/app_bar_with_drawer';
import LoadingCircle from '../../components/common/index';
import ProfileInfo from './../forms/profile_form';
import ResetPassword from './../forms/reset_form';
import {clearUserPasswordNotice,getUserData, updateUserData, updateUserPassword} from '../../actions/index';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            hoverName: false,
            hoverEmail: false,
            hoverBirthday: false,
            formName: false,
            formEmail: false,
            formBirthday: false,
            value: "general",
            resetPass: false,
        };
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.handleInfoCancel = this.handleInfoCancel.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleFormInfo = this.toggleFormInfo.bind(this);
        this.mouseEnterInfo = this.mouseEnterInfo.bind(this);
        this.mouseLeaveInfo = this.mouseLeaveInfo.bind(this);
    }
    componentDidMount(){
        document.title="FlappCards - Profile";
        //on initial route load, prevent axios unless user is authorized
        if(this.props.authorized){
            this.props.getUserData();
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.username !== nextProps.username){
            document.title=`${nextProps.username} - FlappCards Profile`;
        }
    }

    //For the general info
    handleInfoChange(values, str){
        console.log('sending back info vals',values, str);
        if(str === "name"){
            values.name = values.name.trim();
            this.props.updateUserData(values);
            this.setState({formName: !this.state.formName, hoverName: false});
        }else if(str === "email"){
            values.email = values.email.trim();
            this.props.updateUserData(values);
            this.setState({formEmail: !this.state.formEmail, hoverEmail: false});
        }else{
            //mysql date format required for objs, strings are OK already
            if(typeof values.birthday === "object") {
                values.birthday = `${values.birthday.getFullYear()}/${values.birthday.getMonth() + 1}/${values.birthday.getDate()}`;
            }
            this.props.updateUserData(values);
            this.setState({formBirthday: !this.state.formBirthday, hoverBirthday: false});
        }
    }
    //For the general info, cancel form edit
    handleInfoCancel(str){
        console.log('profile bday',str);
        switch(str){
            case "name":
                return this.setState({formName: !this.state.formName, hoverName: false});
            case "email":
                return this.setState({formEmail: !this.state.formEmail, hoverEmail: false});
            case "birthday":
                return this.setState({formBirthday: !this.state.formBirthday, hoverBirthday: false});
        }

    }
    //For the change password tab, axios and reset state
    handlePasswordChange(values){
        if(Object.keys(values).length === 2){
            this.props.updateUserPassword(values);
        }
    }
    //For the change password tab, clear password notifs
    handleRequestClose(){
        this.props.clearUserPasswordNotice();
    }
    mouseEnterInfo(str){
        //this could be made cleaner if we combine the 3 into an array and then we could mutate the array
        //since object keys cant be variable references to the passed in argument
        switch(str){
            case "hoverName":
                return this.setState({hoverName: true});
            case "hoverEmail":
                return this.setState({hoverEmail: true});
            case "hoverBirthday":
                return this.setState({hoverBirthday: true});
        }
    }
    mouseLeaveInfo(str){
        switch(str){
            case "hoverName":
                return this.setState({hoverName: false});
            case "hoverEmail":
                return this.setState({hoverEmail: false});
            case "hoverBirthday":
                return this.setState({hoverBirthday: false});
        }
    }
    //Switch the General Info from div to form editing
    toggleFormInfo(str){
        switch(str){
            case "name":
                return this.setState({formName: !this.state.formName});
            case "email":
                return this.setState({formEmail: !this.state.formEmail});
            case "birthday":
                return this.setState({formBirthday: !this.state.formBirthday});
        }
    }

    //Switching between tabs, reset states of each tab
    handleTabChange(value){
        if(value === "changePassword"){
            this.setState({
                hoverName: false,
                hoverEmail: false,
                hoverBirthday: false,
                formName: false,
                formEmail: false,
                formBirthday: false,
                value: value,
                resetPass: false,
            })
        }else{
            this.setState({
                value: value,
                resetPass: true,
            });
        }
    }

    render(){
        const {formName, formEmail, formBirthday, hoverBirthday, hoverEmail, hoverName} = this.state;
        return (
            <div className="profile-container">
                <FlashCardAppBar />

                {/*On app load, variables are empty*/}
                {!this.props.username &&
                <LoadingCircle name="FlappCards Profile" />
                }

                {/*Server response is successful*/}
                {this.props.username &&
                <div className="profileCard" style={{boxShadow: "5px 5px 2.5px #888888", textAlign:"center",listStyleType:"none",fontFamily:"Roboto, sans-serif", width:"90vw", margin:"2em auto", background:"#FFFFFF"}}>
                    <Tabs value={this.state.value} onChange={this.handleTabChange}>
                        <Tab label="General Information" value="general">
                            <div>
                                <div className="avatarContiner" style={{textAlign: 'center'}}>
                                    <Avatar style={{height:"15em",width:"15em",margin:"1em",boxShadow: "rgba(0, 0, 0, 0.75) 0px 1px 6px, rgba(0, 0, 0, 1) 0px 1px 4px"}} src={`data:image/jpeg;base64,${this.props.avatar}`} crossOrigin="Anonymous"/>
                                </div>
                                {/*import form*/}
                                <ProfileInfo
                                    joined={this.props.joined}
                                    username={this.props.username}
                                    name={this.props.name}
                                    email={this.props.email}
                                    birthday={this.props.birthday}
                                    userInfo={{formName,formEmail,formBirthday,hoverBirthday, hoverEmail,hoverName}} //ES6 bc I was lazy and didnt write the object out
                                    initialValues={{name: this.props.name, email: this.props.email, birthday: this.props.birthday}}
                                    mouseEnter={this.mouseEnterInfo}
                                    mouseLeave={this.mouseLeaveInfo}
                                    handleInfoClick={this.toggleFormInfo}
                                    handleFormSubmit={this.handleInfoChange}
                                    handleFormCancel={this.handleInfoCancel}
                                />
                            </div>
                        </Tab>
                        <Tab label="Change Password" value="changePassword">
                            <div>
                            <ResetPassword
                                onPasswordSubmit={this.handlePasswordChange}
                                switchingTab={this.state.resetPass}
                            />
                            </div>

                        </Tab>
                    </Tabs>
                </div>
                }

                {/*Server Feedback for password success*/}
                <Snackbar
                    action="Close"
                    autoHideDuration={5000}
                    message={"Use new password for your next login"}
                    open={this.props.update}
                    onRequestClose={this.handleRequestClose.bind(this)}
                />
                {/*the above can be combined if profile reducer gets canged and makes update an object with server response*/}
                {/*Server Feedback for server fail*/}
                {/*Need to finish for password success=false */}
                {this.props.errorText.error &&
                <Snackbar
                    action="Close"
                    autoHideDuration={5000}
                    message={this.props.errorText.message}
                    open={this.props.errorText.error}
                    onRequestClose={this.handleRequestClose.bind(this)}
                />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authorized: state.auth.authorized,
        avatar: state.profile.avatar,
        birthday: state.profile.birthday,
        email: state.profile.email,
        joined: state.profile.joinDate,
        name: state.profile.name,
        username: state.profile.userName,
        update: state.profile.update,
        errorText: state.profile.errorText,
    }
}
export default connect(mapStateToProps,{clearUserPasswordNotice, getUserData, updateUserData, updateUserPassword})(Profile);