import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {connect} from 'react-redux'
import {getUserData} from '../../actions/index'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

class Profile extends Component{
    componentWillMount(){
        this.props.getUserData();
    }
    render(){
        const Header = {
            paddingRight: 0
        };
        const profileImg = {
            height: "25vh",
            width: "50vw"
        };
        const listStyle = {
            textAlign: "center",
            listStyleType: "none",
            fontFamily: "Roboto, sans-serif"
        };
        // The list could be a map? But at this point, that feels like code golf
        return (
            <div>
                <FlashCardsAppBar/>
                <Card style={listStyle}>
                    <AccountCircle style={profileImg}/>
                    <CardText>UserName: {this.props.username}</CardText>
                    <CardText>Name: {this.props.name}</CardText>
                    <CardText>Email: {this.props.email}</CardText>
                    <CardText>Join Date: {this.props.joined}</CardText>
                    <CardText>Birthday: {this.props.birthday}</CardText>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.profile.userName,
        email: state.profile.email,
        birthday: state.profile.birthday,
        name: state.profile.name,
        joined: state.profile.joinDate
    }
}

export default connect(mapStateToProps, {getUserData})(Profile);