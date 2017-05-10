import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'
import {Link} from 'react-router'
import RaisedButton from './../../../../node_modules/material-ui/RaisedButton';
import Create from './../../../../node_modules/material-ui/svg-icons/content/create';

class Home extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                    <ul>
                        <Recent/>
                        <Community/>
                    </ul>
                    <Link to="createCards" name="Create Cards">
                        <RaisedButton><Create/></RaisedButton>
                    </Link>
            </div>
        )
    }
}

export default Home