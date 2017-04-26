import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';

class CreateCards extends Component {
    render (){
        return (
            <div>
                <FlashCardsAppBar/>
                <div className="mdl-cell mdl-cell--8-col" >

                    <form action="#">
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" placeholder="Subject Name"/>
                                <input className="mdl-textfield__input" type="text" placeholder="Course Category"/>

                                    <input className="mdl-textfield__input" type="text" placeholder="Subject" pattern="-?[0-9]*(\.[0-9]+)?" id="sample6"/>

                                        <input className="mdl-textfield__input" type="text" placeholder="Question" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4"/>

                                            <input className="mdl-textfield__input" type="text" placeholder="Answer" pattern="-?[0-9]*(\.[0-9]+)?" id="sample5"/>
                        </div>
                    </form>

                    <div className="mdl-grid">
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-cell mdl-cell--4-col">
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--8-col" >

                    <form action="#">
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">

                            <input className="mdl-textfield__input" type="text" placeholder="Question" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4"/>

                                <input className="mdl-textfield__input" type="text" placeholder="Answer" pattern="-?[0-9]*(\.[0-9]+)?" id="sample5"/>
                        </div>
                    </form>

                    <div className="mdl-grid">
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-cell mdl-cell--4-col">
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--8-col">
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onClick="window.location='sample_card.html';">
                                Submit Stack
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateCards