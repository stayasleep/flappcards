import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from '../../../../node_modules/material-ui/Card';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCard} from '../../actions/index'
import RaisedButton from 'material-ui/RaisedButton';

class SingleCard extends Component {
    constructor(props) {
        super(props);
        this.nextCard = this.nextCard.bind(this);
        this.prevCard = this.prevCard.bind(this);
        this.state = {
            card: 0
        }
    }

    nextCard() {
        this.setState({card: this.state.card + 1})
    }
    prevCard() {
        this.setState({ card: this.state.card - 1 })
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
            height: '80vh',
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
                    <RaisedButton style={centered} id="return" containerElement={<Link to="/stackOverview" name="back"/>}>Return</RaisedButton>
                    <RaisedButton primary={true} id="next" onClick={() => {this.nextCard()}}>NEXT</RaisedButton>
                    <RaisedButton backgroundColor="#33CC33" id="Right">RIGHT</RaisedButton>
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

