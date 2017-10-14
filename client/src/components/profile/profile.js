import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import renderInput from '../utilities/renderInputStackOV';
import {getUserData, updateUserData} from '../../actions/index'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import ChangePassword from './profile_change_pw';
import { Tab, Tabs } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import DatePickerForm from './date_picker';

class Profile extends Component{
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
    }
    //For the Tab
    handleChange(value){
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

    mouseEnterName(){
        this.setState({hoverName: true});
    }
    mouseLeaveName(){
        this.setState({hoverName: false});
    }
    mouseEnterEmail(){
        this.setState({hoverEmail: true});
    }
    mouseLeaveEmail(){
        this.setState({hoverEmail: false});
    }
    mouseEnterBirthday(){
        this.setState({hoverBirthday: true});
    }
    mouseLeaveBirthday(){
        this.setState({hoverBirthday: false});
    }

    handleNameClick(){
        this.setState({formName: !this.state.formName, hoverName: false});
    }
    handleEmailClick(){
        this.setState({formEmail: !this.state.formEmail, hoverEmail: false});
    }
    handleBirthdayClick(){
        this.setState({formBirthday: !this.state.formBirthday, hoverBirthday: false});
    }

    handleFormCancel(str){
        if(str === "name"){
            this.setState({formName: !this.state.formName});
        }else if (str === "email"){
            this.setState({formEmail: !this.state.formEmail});
        }else{
            this.setState({formBirthday: !this.state.formBirthday});
        }
        this.props.reset("generalInfo");
    }
    handleFormSubmit(values, str){
        if(str === "name"){
            this.props.updateUserData(values);
            this.setState({formName: !this.state.formName});
        }else if(str === "email"){
            this.props.updateUserData(values);
            this.setState({formEmail: !this.state.formEmail});
        }else{
            //mysql date format required
            values.birthday = `${values.birthday.getFullYear()}/${values.birthday.getMonth()+1}/${values.birthday.getDate()}`;
            this.props.updateUserData(values);
            this.setState({formBirthday: !this.state.formBirthday});
        }
    }

    componentWillMount(){
        this.props.getUserData();
        document.title="FlappCards - Profile";
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.username){
            document.title = `${nextProps.username} on FlappCards`;
        }
    }

    render(){
        let hoverName = "none";
        let hoverEmail = "none";
        let hoverBirthday = "none";

        if(this.state.hoverName){
            hoverName = "inline-block";
        }
        if(this.state.hoverEmail){
            hoverEmail = "inline-block";
        }
        if(this.state.hoverBirthday){
            hoverBirthday = "inline-block";
        }
        const profileImg = {
            height: "15em",
            width: "15em",
            margin: "1em",
            boxShadow: "rgba(0, 0, 0, 0.75) 0px 1px 6px, rgba(0, 0, 0, 1) 0px 1px 4px"
        };
        const listStyle = {
            textAlign: "center",
            listStyleType: "none",
            fontFamily: "Roboto, sans-serif",
            width:"80vw",
            margin: "2em auto",
            backgroundColor:"white",
        };
        //before props are ready
        if(!this.props.username){
            return (
                <div>
                    <FlashCardsAppBar/>
                    <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif", padding: 12}}>
                        <CircularProgress size={80} thickness={6} />
                    </div>
                </div>
            )
        }
        const { handleSubmit, initialValues } = this.props;

        //format the birthday for DatePicker
        let profileBDay = this.props.birthday.split("/");
        let num = new Date();
        num.setFullYear(profileBDay[0],profileBDay[1]-1,profileBDay[2]);
        num.setHours(0,0,0,0);


        return (
            <div>
                <FlashCardsAppBar/>

                <Card style={listStyle} className="profileCard">
                    <Tabs value={this.state.value} onChange={this.handleChange.bind(this)}>
                        <Tab label="General Info" value="general">
                            <div style={{textAlign:"center"}}>
                                <div className="avatarContiner">
                                    <Avatar style={profileImg} src={`data:image/jpeg;base64,${this.props.avatar}`} crossOrigin="Anonymous"/>
                                </div>
                                <div className="profileTable">
                                    <div className="profileBody">
                                        <CardText className="joinContainer">
                                            <div className="joinTitle">Join Date:</div>
                                            <div className="join">{this.props.joined}</div>
                                        </CardText>
                                        <CardText className="usernameContainer">
                                            <div className="usernameTitle">Username:</div>
                                            <div className="username">{this.props.username}</div>
                                        </CardText>
                                    {!this.state.formName ? (
                                            <CardText className="nameContainer">
                                                <div className="nameTitle">Name:</div>
                                                <div className="name"
                                                     onMouseEnter={this.mouseEnterName.bind(this)}
                                                     onMouseLeave={this.mouseLeaveName.bind(this)}
                                                     onClick={this.handleNameClick.bind(this)}
                                                >
                                                     {this.props.name}
                                                </div>
                                                    <EditMode className="nameSVG" style={{display: hoverName}} />
                                            </CardText>
                                        ) : (
                                            <CardText className="nameContainer">
                                                <div className="nameTitle">Name:</div>
                                                <form className="nameForm" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"name")})}>
                                                    <div className="editFormName">
                                                        <Field className="editName" name="name" component={renderInput} />
                                                    </div>
                                                    <div className="editFormButtons">
                                                        <button className="editbtn btn btn-main" type="submit">Save</button>
                                                        <button className="editbtn btn btn-secondary" type="button" onClick={(str) => this.handleFormCancel.bind(this)("name")}>Cancel</button>
                                                    </div>
                                                </form>
                                            </CardText>
                                        )
                                    }
                                    {!this.state.formEmail ? (
                                            <CardText className="emailContainer">
                                                <div className="emailTitle">Email: </div>
                                                <div className="email"
                                                     onMouseEnter={this.mouseEnterEmail.bind(this)}
                                                     onMouseLeave={this.mouseLeaveEmail.bind(this)}
                                                     onClick={this.handleEmailClick.bind(this)}
                                                >
                                                    {this.props.email}
                                                </div>
                                                    <EditMode style={{display: hoverEmail}} />
                                            </CardText>
                                        ) : (
                                            <CardText className="emailContainer" >
                                                <div className="emailTitle">Email:</div>
                                                <form className="emailForm" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"email")})}>
                                                    <div className="editFormEmail">
                                                        <Field className = "editEmail" name="email" component={renderInput} />
                                                    </div>
                                                    <div className="editFormButtons">
                                                        <button className="editbtn btn btn-main" type="submit">Save</button>
                                                        <button className="editbtn btn btn-secondary" type="button" onClick={(str) => this.handleFormCancel.bind(this)("email")}>Cancel</button>
                                                    </div>
                                                </form>
                                            </CardText>
                                        )
                                    }
                                    {!this.state.formBirthday ? (
                                            <CardText className="birthdayContainer">
                                                <div className="birthdayTitle">Birthday: </div>
                                                <div className="birthday"
                                                     onMouseEnter={this.mouseEnterBirthday.bind(this)}
                                                     onMouseLeave={this.mouseLeaveBirthday.bind(this)}
                                                     onClick={this.handleBirthdayClick.bind(this)}
                                                >
                                                    {this.props.birthday}
                                                </div>
                                                    <EditMode style={{display: hoverBirthday}} />
                                            </CardText>
                                        ) : (
                                            <CardText className="birthdayContainer">
                                                <div className="birthdayTitle">Birthday:</div>
                                                <form className="birthdayForm" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"birthday")})}>
                                                    <div className="editFormBirthday">
                                                      <Field className="editField" name="birthday" defaultValue={{min:num}} component={DatePickerForm} onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"birthday")})} onClose={(str) => this.handleFormCancel.bind(this)("birthday")} />
                                                    </div>
                                                    <div className="editFormButtons">
                                                        <button className="editbtn btn btn-main" type="submit">Save</button>
                                                        <button className="editbtn btn btn-secondary" type="button" onClick={(str) => this.handleFormCancel.bind(this)("birthday")}>Cancel</button>
                                                    </div>
                                                </form>
                                            </CardText>
                                            )
                                    }
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Change Password" value="changePassword">
                            <ChangePassword updated={this.props.update} errTxt={this.props.errorText} shouldReset={this.state.resetPass} />
                        </Tab>
                    </Tabs>
                </Card>


            </div>
        )
    }
}

function validate(values){
    const min_age = 13;
    const errors = {};

    if(!values.name){
        errors.name = "Required";
    }else if(values.name.length < 2){
        errors.name = "Name must contain at least two (2) characters";
    }else if(values.name.length > 40){
        errors.name = "Name must contain fewer than 40 charracters";
    }

    if(!values.email){
        errors.email = "Required";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)){
        errors.email = "Invalid email address";
    }

    if(!values.birthday){
        errors.birthday = "Required";
    }else if(values.birthday && typeof values.birthday === "object"){//when DatePicker is active it is an object, else bday is a string
        let today = new Date();
        let year = values.birthday.getFullYear();
        let month = values.birthday.getMonth();
        let day = values.birthday.getDate();
        let bday = new Date((year + min_age), month, day);
        if(today.getTime() - bday.getTime() < 0){
           errors.birthday = "Must be 13 years or older to use FlappCards!";
        }
    }

    return errors;

}

Profile = reduxForm({
    form: "generalInfo",
    enableReinitialize: true,
    overwriteOnInitialValuesChange: false,
    validate
})(Profile);

function mapStateToProps(state) {
    return {
        username: state.profile.userName,
        email: state.profile.email,
        birthday: state.profile.birthday,
        name: state.profile.name,
        joined: state.profile.joinDate,
        avatar: state.profile.avatar,
        update: state.profile.update,
        errorText: state.profile.errorText,
        initialValues: {name: state.profile.name, email: state.profile.email, birthday: state.profile.birthday}

    }
}

export default connect(mapStateToProps, {getUserData, updateUserData})(Profile);