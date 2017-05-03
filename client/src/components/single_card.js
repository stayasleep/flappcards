import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from '../../../node_modules/material-ui/Card';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCard} from '../actions/index'

class SingleCard extends Component {
    static contextTypes ={
        router: PropTypes.object
    };

    componentWillMount(){
        this.props.getCard(this.props.params.id);
    }

    render() {
        const card = this.props.cards["0"];
        console.log(card);
        if(!card){
            return <h3>Loading...</h3>
        }
        return (
            <div>
                <div className="mdl-card mdl-shadow--2dp " id="questionCard">
                    <h2 className="mdl-card__title-text " id="question">
                        {card.question}
                    </h2>
                    <h2 className="mdl-card__title-text " id="answer">
                        {card.answer}
                    </h2>
                <div className="mdl-card__menu">
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.stack.single
    }
}

export default connect(mapStateToProps, {getCard})(SingleCard);

