import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Create from 'material-ui/svg-icons/content/create';
import Paper from 'material-ui/Paper';

class Home extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <Paper>
                <div>
                    <Recent/>
                </div>
                <div>
                    <Community/>
                </div>
                    <Link to="createCards" name="Create Cards">
                        <RaisedButton><Create/></RaisedButton>
                    </Link>
                </Paper>
            </div>
        )
    }
}

export default Home;
