import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';

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
                        <tr>
                            <td className="mdl-data-table__cell--non-numeric">Biology</td>
                            <td>10</td>
                            <td>(Calculated Value)</td>
                            <td>
                                <button className="mdl-button mdl-js-button mdl-button--primary">
                                    <a href="sample_card.html"><i className="material-icons">visibility</i></a>
                                </button>
                            </td>


                        </tr>
                        <tr>
                            <td className="mdl-data-table__cell--non-numeric">Chemistry</td>
                            <td>10</td>
                            <td>(Calculated Value)</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--primary"><i className="material-icons">visibility</i></button></td>
                        </tr>
                        <tr>
                            <td className="mdl-data-table__cell--non-numeric">Math</td>
                            <td>10</td>
                            <td>(Calculated Value)</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--primary"><i className="material-icons">visibility</i></button></td>

                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyShelf