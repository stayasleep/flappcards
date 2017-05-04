import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Stacks from './my_shelf_td'

class MyShelf extends Component {
    render(){
        return (
            <div>
                <FlashCardsAppBar/>
                <div>
                    <Stacks/>
                </div>
            </div>
        )
    }
}

export default MyShelf