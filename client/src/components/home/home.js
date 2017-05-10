import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Create from 'material-ui/svg-icons/content/create';

class Home extends Component {
    render(){
        const styles = {
            body: {
                height: "100vh",
                width: "100vw"
            }
        };
        return(
            <div style={styles.body}>
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

export default Home;
