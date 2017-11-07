import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {CardText} from 'material-ui/Card';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import renderInput from '../../components/utilities/renderInputStackOV';
import DatePickerForm from '../../components/common/date_picker';

class ProfileInfo extends Component {
    constructor(props){
        super(props);
        this.handleFormCancel = this.handleFormCancel.bind(this);
    }
    //using a callback because in case user makes an edit and doesnt save...we want to reset the value to orig
    handleFormCancel(str){
        this.props.handleFormCancel(str);
        this.props.reset('profileInfo');
    }

    render(){
        const { handleSubmit, reset, submitting } = this.props;

        let bday = this.props.birthday.split("/");
        let formatBday = new Date();
        formatBday.setFullYear(bday[0],bday[1]-1,bday[2]);
        formatBday.setHours(0,0,0,0);

        let hoverName = "none";
        let hoverEmail = "none";
        let hoverBirthday = "none";

        if(this.props.userInfo.hoverName){
            hoverName = "inline-block";
        }
        if(this.props.userInfo.hoverEmail){
            hoverEmail = "inline-block";
        }
        if(this.props.userInfo.hoverBirthday){
            hoverBirthday = "inline-block";
        }

        return (
            <div>
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
                        {!this.props.userInfo.formName ? (
                                <CardText className="nameContainer">
                                    <div className="nameTitle">Name:</div>
                                    <div className="name"
                                        onMouseEnter={()=>this.props.mouseEnter("hoverName")}
                                        onMouseLeave={()=>this.props.mouseLeave("hoverName")}
                                        onClick={()=>this.props.handleInfoClick("name")}
                                    >
                                        {this.props.name}
                                    </div>
                                    <EditMode className="nameSVG" style={{display: hoverName}} />
                                </CardText>
                            ) : (
                                <CardText className="nameContainer">
                                    <div className="nameTitle">Name:</div>
                                    <form className="nameForm" onSubmit={handleSubmit((values) => {this.props.handleFormSubmit(values,"name")})}>
                                        <div className="editFormName">
                                            <Field className="editName" name="name" component={renderInput} />
                                        </div>
                                        <div className="editFormButtons">
                                            <button className="editbtn btn btn-main" type="submit">Save</button>

                                            <button className="editbtn btn btn-secondary" type="button" onClick={()=>this.handleFormCancel("name")}>Cancel</button>
                                        </div>
                                    </form>
                                </CardText>
                            )
                        }
                        {!this.props.userInfo.formEmail ? (
                                <CardText className="emailContainer">
                                    <div className="emailTitle">Email: </div>
                                    <div className="email"
                                         onMouseEnter={()=>this.props.mouseEnter("hoverEmail")}
                                         onMouseLeave={()=>this.props.mouseLeave("hoverEmail")}
                                         onClick={()=>this.props.handleInfoClick("email")}
                                    >
                                        {this.props.email}
                                    </div>
                                    <EditMode style={{display: hoverEmail}} />
                                </CardText>
                            ) : (
                                <CardText className="emailContainer" >
                                    <div className="emailTitle">Email:</div>
                                    <form className="emailForm" onSubmit={handleSubmit((values) => {this.props.handleFormSubmit(values,"email")})}>
                                        <div className="editFormEmail">
                                            <Field className = "editEmail" name="email" component={renderInput} />
                                        </div>
                                        <div className="editFormButtons">
                                            <button className="editbtn btn btn-main" type="submit">Save</button>
                                            <button className="editbtn btn btn-secondary" type="button" onClick={() => this.handleFormCancel("email")}>Cancel</button>
                                        </div>
                                    </form>
                                </CardText>
                            )
                        }
                        {!this.props.userInfo.formBirthday ? (
                                <CardText className="birthdayContainer">
                                    <div className="birthdayTitle">Birthday: </div>
                                    <div className="birthday"
                                         onMouseEnter={()=>this.props.mouseEnter("hoverBirthday")}
                                         onMouseLeave={()=>this.props.mouseLeave("hoverBirthday")}
                                         onClick={()=>this.props.handleInfoClick("birthday")}
                                    >
                                        {this.props.birthday}
                                    </div>
                                    <EditMode style={{display: hoverBirthday}} />
                                </CardText>
                            ) : (
                                <CardText className="birthdayContainer">
                                    <div className="birthdayTitle">Birthday:</div>
                                    <form className="birthdayForm" onSubmit={handleSubmit((values) => {this.props.handleFormSubmit(values,"birthday")})}>
                                        <div className="editFormBirthday">
                                            <Field className="editField" name="birthday" defaultValue={{min:formatBday}} component={DatePickerForm} onSubmit={handleSubmit((values) => {this.handleFormSubmit(values,"birthday")})} onClose={(str) => this.handleFormCancel.bind(this)("birthday")} />
                                        </div>
                                        <div className="editFormButtons">
                                            <button className="editbtn btn btn-main" type="submit">Save</button>
                                            <button className="editbtn btn btn-secondary" type="button" onClick={() => this.handleFormCancel("birthday")}>Cancel</button>
                                        </div>
                                    </form>
                                </CardText>
                            )
                        }
                    </div>
                </div>
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
    }else if(values.name && /^\s+$/.test(values.name)){
        errors.name="Name cannot be empty spaces";
    }

    if(!values.email){
        errors.email = "Required";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)){
        errors.email = "Invalid email address";
    }else if(values.email.length > 30){
        errors.email = "Email must be shorter than 30 characters";
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

ProfileInfo=reduxForm({
    form:'profileInfo',
    validate,
    enableReinitialize: true,
})(ProfileInfo);

export default connect(null,{})(ProfileInfo);