import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import StackViewStacks from './stackView_stacks'
import {GridList, GridTile} from 'material-ui/GridList';

class Stacks extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <div>
                    <StackViewStacks/>
                </div>
            </div>
        )
}
}

export default Stacks;