import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'

class Home extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <div style={{textAlign: "center"}}>
                    <Recent/>
                </div>
                <div style={{textAlign: "center"}}>
                    <Community/>
                </div>
            </div>
        )
    }
}

export default Home;
