import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from '../../../node_modules/material-ui/Card';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCard} from '../actions/index'
import RaisedButton from 'material-ui/RaisedButton';

class SingleCard extends Component {
    constructor(props) {
        super(props);
        this.nextCard = this.nextCard.bind(this);
        this.state = {
            card: 0
        }
    }

    nextCard() {
        this.setState({ card: this.state.card + 1 })
    }

    static contextTypes ={
        router: PropTypes.object,
    };


    componentWillMount(){
        this.props.getCard(this.props.params.id);
    }
    componentDidUpdate(){
        var flip = true;
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
            width: '100vw',
            height: '100vh',
            transition: 'transform 1s',
            textAlign: "center",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            display: "flex",
            justifyContent: "center",
            backfaceVisibility: "visible"
        };
        const answerCard = {
            display: "none"
        };

        const flippedCard ={
            transform: "rotate(180deg)"
        };

        const answer ={
            display: "none",
            transform: "scale(1)"
        };

        const question ={
            display: "block"
        };

        const onSubmit = this.props;
        const card = this.props.cards[this.state.card];
        if(!card){
            return <h3>Loading...</h3>
        }
        return (
            <div>
                <div style={cardStyle} className="mdl-card mdl-shadow--2dp " id="questionCard">
                    <h2 style={question} id="question">
                        {card.question}
                    </h2>
                    <h2 style={answer} id="answer">
                        {card.answer}
                        <RaisedButton onClick={() => {this.nextCard()}}>NEXT</RaisedButton>
                    </h2>
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

