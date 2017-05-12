import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Stacks from './my_shelf_td'
import Paper from 'material-ui/Paper';

class MyShelf extends Component {
    render(){
        return (
            <div>
                <FlashCardsAppBar/>
                <Paper>
                    <Stacks/>
                </Paper>
            </div>
        )
    }
}

export default MyShelf