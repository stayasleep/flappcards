import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';

class Profile extends Component{
    render(){
        return (
            <div>
                <FlashCardsAppBar/>
                <div>profile page</div>
            </div>
        )
    }
}

export default Profile;