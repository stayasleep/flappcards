import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import renderInput from '../utilities/renderInputStackOV';
import {getUserData, updateUserData} from '../../actions/index'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';
import ChangePassword from './profile_change_pw';
import { Tab, Tabs } from 'material-ui/Tabs';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';

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
            // controlledDate: this.props.birthday,
        };
    }
    //For the Tab
    handleChange(value){
        console.log('val',value);
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
        this.setState({formName: !this.state.formName});
    }
    handleEmailClick(){
        this.setState({formEmail: !this.state.formEmail});
    }
    handleBirthdayClick(){
        this.setState({formBirthday: !this.state.formBirthday});
    }
    handleDateChange(event, date){
        console.log('an event',event);
        console.log('an date',date);
        this.setState({controlledDate: date})
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
        console.log('vals',values);
        if(str === "name"){
            //make axios
            this.props.updateUserData(values);
            this.setState({formName: !this.state.formName});
        }else if(str === "email"){
            //axios
            this.props.updateUserData(values);
            this.setState({formEmail: !this.state.formEmail});
        }else{
            this.props.updateUserData(values);
            this.setState({formBirthday: !this.state.formBirthday});
            //axios

        }
    }

    componentWillMount(){
        this.props.getUserData();
        document.body.style.backgroundColor = "#f0f0f0";
        document.title="FlappCards - Profile";
    }

    render(){
        console.log('profile is rendered',this.props);
        console.log('state',this.state);
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
        initialValues.name = this.props.name;
        initialValues.email = this.props.email;
        initialValues.birthday = this.props.birthday;

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
                                        <CardText className="joinContainer"><div className="joinTitle td">Join Date:</div><div className="join td">{this.props.joined}</div></CardText>
                                        <CardText className="usernameContainer"><div className="usernameTitle td">Username:</div><div className="username td">{this.props.username}</div></CardText>
                                    {!this.state.formName ? (
                                            <CardText className="nameContainer">
                                                <div className="nameTitle td">Name:</div>
                                                <div className="name td"
                                                     onMouseEnter={this.mouseEnterName.bind(this)}
                                                     onMouseLeave={this.mouseLeaveName.bind(this)}
                                                     onClick={this.handleNameClick.bind(this)}
                                                >
                                                     {this.props.name}
                                                    <EditMode style={{display: hoverName}} />
                                                </div>
                                            </CardText>
                                        ) : (
                                                <form className="tr" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"name")})}>
                                                    <div className="nameTitle td">Name:</div>
                                                    <div className="nameFormContainer td">
                                                        <Field className="editName" name="name" component={renderInput} />
                                                        <RaisedButton onClick={(str) => this.handleFormCancel.bind(this)("name")} label="Cancel" labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0"/>
                                                    </div>
                                                </form>
                                        )
                                    }
                                    {!this.state.formEmail ? (
                                            <CardText className="emailContainer">
                                                <div className="emailTitle td">Email: </div>
                                                <div className="email td"
                                                     onMouseEnter={this.mouseEnterEmail.bind(this)}
                                                     onMouseLeave={this.mouseLeaveEmail.bind(this)}
                                                     onClick={this.handleEmailClick.bind(this)}
                                                >
                                                    {this.props.email}
                                                    <EditMode style={{display: hoverEmail}} />
                                                </div>
                                            </CardText>
                                        ) : (
                                                <form className="tr" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"email")})}>
                                                    <div className="emailTitle td">Email:</div>
                                                    <div className="emailFormContainer td">
                                                        <Field className = "editEmail" name="email" component={renderInput} />
                                                        <RaisedButton onClick={(str) => this.handleFormCancel.bind(this)("email")} label="Cancel" labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" />
                                                    </div>
                                                </form>
                                        )
                                    }
                                    {!this.state.formBirthday ? (
                                            <CardText className="birthdayContainer">
                                                <div className="birthdayTitle td">Birthday: </div>
                                                <div className="birthday td"
                                                     onMouseEnter={this.mouseEnterBirthday.bind(this)}
                                                     onMouseLeave={this.mouseLeaveBirthday.bind(this)}
                                                     onClick={this.handleBirthdayClick.bind(this)}
                                                >
                                                    {this.props.birthday}
                                                    <EditMode style={{display: hoverBirthday}} />
                                                </div>
                                            </CardText>
                                        ) : (
                                                <form className="tr" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"birthday")})}>
                                                    <div className="birthdayTitle td">Birthday:</div>
                                                    <div className="birthdayFormContainer td">
                                                        <Field className="editBirthday" name="birthday" component={renderInput} />
                                                        <RaisedButton onClick={(str) => this.handleFormCancel.bind(this)("birthday")} label="Cancel" labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" />
                                                    </div>
                                                </form>
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
    }else if(values.birthday){
        let birth = values.birthday.replace(/[^0-9]/g, "");
        console.log('birthhhh',birth);
        if(!/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/i.test(birth)){
            errors.birthday = "Date must follow YYYY-MM-DD format";
        }
        let year  = parseInt(birth.slice(0,4));
        let month = parseInt(birth.slice(4,6));
        let day = parseInt(birth.slice(6,8));
        if(month > 12){
            errors.birthday = "Month is not valid";
        }else if(month < 10){
            month = parseInt("0"+month);
        }

        if(day >31){
            errors.birthday =" Day is not valid";
        }else if(day < 10){
            day = parseInt("0"+day);
        }
        if(!/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/i.test(birth)){
            errors.birthday = "Date must follow YYYY-MM-DD format";
        }

        let theirDate = new Date((year+min_age), month, day);
        let today = new Date;
        if((today.getTime() - theirDate.getTime()) < 0) {
            errors.birthday = "You must be 13 years or older to use FlappCards.";
        }
    }

    return errors;

}

Profile = reduxForm({
    form: "generalInfo",
    initialValues:{"name":"", "email": "", "birthday": ""},
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
    }
}

export default connect(mapStateToProps, {getUserData, updateUserData})(Profile);