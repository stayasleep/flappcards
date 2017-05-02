import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';
import Stacks from './my_shelf_td'

class MyShelf extends Component {
    render(){
        return (
            <div>
                <FlashCardsAppBar/>
                <div>
                    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
                        <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Subjects</th>
                            <th>Number of Cards</th>
                            <th>Rating</th>
                            <th>View</th>

                        </tr>
                        </thead>
                        <tbody>
                        <Stacks/>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyShelf