import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {connect} from 'react-redux'
import {getUserData} from '../../actions/index'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

class Profile extends Component{
    componentWillMount(){
        this.props.getUserData();
    }
    render(){
        const profileImg = {
            height: "50vh",
            width: "50vw"
        };
        const listStyle = {
            listStyleType: "none",
            fontFamily: "Roboto, sans-serif"
        };
        // The list could be a map? But at this point, that feels like code golf
        return (
            <div>
                <FlashCardsAppBar/>
                <div>
                    <AccountCircle style={profileImg}/>
                    <ul style={listStyle}>
                        <li>
                            Name: {this.props.name}
                        </li>
                        <li>
                            Username: {this.props.username}
                        </li>
                        <li>
                            Email: {this.props.email}
                        </li>
                        <li>
                            Birthday: {this.props.birthday}
                        </li>
                        <li>
                            Join Date: {this.props.joined}
                        </li>
                    </ul>
                </div>
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