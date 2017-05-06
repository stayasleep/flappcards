import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Stacks from './my_shelf_td'


// TODO Why  is MyShelf its own component and stacks another? Do we actually reuse the Stacks component elsewhere?
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