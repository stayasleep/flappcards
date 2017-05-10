import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Create from 'material-ui/svg-icons/content/create';
class Home extends Component {

    CreateButton() {
        return (
            <RaisedButton><Create /></RaisedButton>
        );
    }



    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <div>
                    <ul>
                        <Recent/>
                    </ul>
                </div>
                <div>
                    <ul>
                        <Community/>
                    </ul>
                </div>
                    <Link to="createCards" name="Create Cards">
                        <RaisedButton><Create/></RaisedButton>
                    </Link>
            </div>
        )
    }
}

export default Home