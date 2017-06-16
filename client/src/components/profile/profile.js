import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {connect} from 'react-redux'
import {getUserData} from '../../actions/index'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';

import Avatar from 'material-ui/Avatar';

class Profile extends Component{
    componentWillMount(){
        this.props.getUserData();
    }
    render(){

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
            marginTop: "1em"
        };
        // The list could be a map? But at this point, that feels like code golf
        return (
            <div>
                <FlashCardsAppBar/>
                <Card style={listStyle}>
                    <Avatar style={profileImg}
                            src={`https://flappcards.com/api/avatars/${this.props.avatar}`}

                    />
                    <CardText>Username: {this.props.username}</CardText>
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
        joined: state.profile.joinDate,
        avatar: state.profile.avatar
    }
}

export default connect(mapStateToProps, {getUserData})(Profile);