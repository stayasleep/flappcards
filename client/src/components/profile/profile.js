import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import renderInput from '../utilities/renderInputStackOV';
import {getUserData} from '../../actions/index'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';


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
        };
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

    handleNameCancel(){
        this.setState({formName: !this.state.formName});
    }
    handleEmailCancel(){
        this.setState({formEmail: !this.state.formEmail});
    }
    handleBirthdayCancel(){
        
    }
    componentWillMount(){
        this.props.getUserData();
        document.body.style.backgroundColor = "#f0f0f0";
        document.title="FlappCards - Profile";
    }

    componentWillUnmount(){
        document.title="FlappCards";
    }

    render(){
        let hoverName = "none";
        let hoverEmail = "none";
        let hoverBirthday = "none";

        if(this.state.hoverName){
            hoverName = "inline-block";
        }else if(this.state.hoverEmail){
            hoverEmail = "inline-block";
        }else if(this.state.hoverBirthday){
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
        // The list could be a map? But at this point, that feels like code golf [lol]
        return (
            <div>
                <FlashCardsAppBar/>

                <Card style={listStyle}>
                    <Avatar style={profileImg} src={`data:image/jpeg;base64,${this.props.avatar}`} crossOrigin="Anonymous"/>
                    <CardText><div className="join">Join Date: {this.props.joined}</div></CardText>
                    <CardText><div className="username">Username: {this.props.username}</div></CardText>
                    {!this.state.formName ? (
                            <CardText><div className="name" onMouseEnter={this.mouseEnterName.bind(this)} onMouseLeave={this.mouseLeaveName.bind(this)} onClick={this.handleNameClick.bind(this)}>Name: {this.props.name} <EditMode style={{display: hoverName}} /></div> </CardText>
                        ) : (
                            <CardText>
                                <form>
                                    <Field className="editName" name="name" component={renderInput} />
                                    <RaisedButton onClick={this.handleNameCancel.bind(this)} label="Cancel"/>

                                </form>
                            </CardText>
                        )
                    }
                    {!this.state.formEmail ? (
                            <CardText><div className="email" onMouseEnter={this.mouseEnterEmail.bind(this)} onMouseLeave={this.mouseLeaveEmail.bind(this)} onClick={this.handleEmailClick.bind(this)}>Email: {this.props.email} <EditMode style={{display: hoverEmail}} /></div> </CardText>
                        ) : (
                            <CardText>
                                <form>
                                    <Field className = "editEmail" name="email" component={renderInput} />
                                    <RaisedButton onClick={this.handleEmailCancel.bind(this)} label="Cancel" />
                                </form>
                            </CardText>
                        )
                    }
                    {!this.state.formBirthday ? (
                            <CardText><div className="birthday" onMouseEnter={this.mouseEnterBirthday.bind(this)} onMouseLeave={this.mouseLeaveBirthday.bind(this)} onClick={this.handleBirthdayClick.bind(this)}>Birthday: {this.props.birthday} <EditMode style={{display: hoverBirthday}} /></div> </CardText>
                        ) : (
                            <CardText>
                                <form>
                                    <Field className="editBirthday" name="birthday" component={renderInput} />
                                    <RaisedButton onClick={this.handleBirthdayCancel.bind(this)} label="Cancel" />
                                </form>
                            </CardText>
                        )
                    }
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
    }


}

Profile = reduxForm({
    form: "generalInfo",
    validate
})(Profile);

function mapStateToProps(state) {
    console.log('profile state',state.profile);
    return {
        username: state.profile.userName,
        email: state.profile.email,
        birthday: state.profile.birthday,
        name: state.profile.name,
        joined: state.profile.joinDate,
        avatar: state.profile.avatar
    }
}

export default connect(mapStateToProps, {getUserData})(Profile);