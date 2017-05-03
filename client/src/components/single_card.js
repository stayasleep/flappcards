import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from '../../../node_modules/material-ui/Card';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCard} from '../actions/index'
import RaisedButton from 'material-ui/RaisedButton';

class SingleCard extends Component {
    static contextTypes ={
        router: PropTypes.object,
    };

    componentWillMount(){
        this.props.getCard(this.props.params.id);
    }
    componentDidUpdate(){
        var flip = true;
        console.log(document);
        document.getElementById('questionCard').addEventListener('click', switchDisplay);
        function switchDisplay() {
            var questionCard = document.getElementById('questionCard');
            if (flip) {
                this.classList.toggle('flippedCard');
                setTimeout(function () {
                    document.getElementById('question').style.display = 'none';
                    document.getElementById('answer').style.display = 'block';
                    flip = false;
                }, 300);
            } else {
                this.classList.toggle('flippedCard');
                setTimeout(function () {
                    document.getElementById('question').style.display = 'block';
                    document.getElementById('answer').style.display = 'none';
                    flip = true;
                }, 300);
            }
        }
    }

    render() {
        const cardStyle = {
                width: '100%',
                height: '100%',
                transition: 'transform 1s',
                display: "block"
        };

        const answerCard = {
            display: "none"
        };

        const flippedCard ={
            transform: "rotateY(180deg)"
        };

        const answer ={
            display: "none",
        };

        const question ={
            display: "block"
        };

        const card = this.props.cards[0];
        if(!card){
            return <h3>Loading...</h3>
        }
        return (
            <div>
                <div style={cardStyle} className="mdl-card mdl-shadow--2dp " id="questionCard">
                    <h2 style={question} className="mdl-card__title-text " id="question">
                        {card.question}
                    </h2>
                    <h2 style={answer} className="mdl-card__title-text " id="answer">
                        {card.answer}
                        <RaisedButton>Next</RaisedButton>
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

