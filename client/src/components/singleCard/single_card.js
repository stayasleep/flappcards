import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardTitle, CardText} from '../../../../node_modules/material-ui/Card';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCard, getStackOverview} from '../../actions/index'
import RaisedButton from 'material-ui/RaisedButton';
// this.context.router.push is what allows the URL to change without actually having to send requests

class SingleCard extends Component {
    constructor(props) {
        super(props);
        this.nextCard = this.nextCard.bind(this);
        this.prevCard = this.prevCard.bind(this);
        // Refers to index in array
        // Use the index in the array to update the card_id dynamically/accurately
        this.state = {
            card: 0
        }
    }

    nextCard() {
        const {card} = this.state;
        // card === cards.length-1 means that you are at the end of the deck
        // So we reset card to 0 giving the appearance of the deck wrapping around
        if (card === this.props.cards.length-1) {
            this.setState({card: 0 });
        }
        else {
            console.log("nextCard, inside of else statement, card", card);
            this.setState({
                card: this.state.card+1,
            });
        }
        console.log("nextCard() card before push statement", card);
        this.context.router.push(`/stackOverview/${this.props.cards[0].stack_id}/${this.props.cards[card].card_id}`);
    }
    prevCard() {
        const {card} = this.state;
        if (this.state.card === 0){
            this.setState({card: this.props.cards.length-1});
        }
        else {
            console.log("prevCard setState else statement");
            this.setState({
                card: this.state.card - 1,
            });
        }
        console.log("card before push statement", card);
        this.context.router.push(`/stackOverview/${this.props.cards[0].stack_id}/${this.props.cards[card].card_id}`);
    }

    static contextTypes ={
        router: PropTypes.object,
    };

    componentWillMount() {
        console.log("single_card view");
    }

    componentDidMount(){
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
        const centered = {
            textAlign: "center"
        };
        const right = {
            textAlign: "center"
        };
        const wrong = {
            textAlign: "center",
            backgroundColor: "red"
        };
        const cardStyle = {
            width: '100vw',
            height: '90vh',
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
        // this.state.card is the index for the next and previous
        const card = this.props.cards[this.state.card];
        if(!card){
            return <h3>Loading...</h3>
        }
        return (
            <div>
                <div style={cardStyle} id="questionCard">
                    <h2 style={question} id="question">
                        {card.question}
                    </h2>
                    <h2 style={answer} id="answer">
                        {card.answer}
                    </h2>
                </div>
                <div  style={centered}>
                    <RaisedButton backgroundColor="#E53935" id="Wrong">WRONG</RaisedButton>
                    <RaisedButton primary={true} id="previous" onClick={() => {this.prevCard()}}>PREVIOUS</RaisedButton>
                    <RaisedButton style={centered} id="return" containerElement={<Link to={`/stackOverview/${this.props.cards[this.state.card].stack_id}/`} name="back"/>}>Return</RaisedButton>
                    <RaisedButton primary={true} id="next" onClick={() => {this.nextCard()}}>NEXT</RaisedButton>
                    <RaisedButton backgroundColor="#33CC33" id="Right">RIGHT</RaisedButton>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.stack.stackCards,
        stackCards: state.stack.stackCards,

    }
}

export default connect(mapStateToProps, {getCard, getStackOverview})(SingleCard);

