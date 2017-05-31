import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCard, getStackOverview} from '../../actions/index'
import RaisedButton from 'material-ui/RaisedButton';
// this.context.router.push is what allows the URL to change without actually having to send requests
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import Paper from 'material-ui/Paper';
import SkipNext from 'material-ui/svg-icons/AV/skip-next';
import SkipPrevious from 'material-ui/svg-icons/AV/skip-previous';


class SingleCard extends Component {

    static contextTypes ={
        router: PropTypes.object,
    };
    state = {
        card: 0
    };

    nextCard() {
        document.getElementById('question').style.display = 'block';
        document.getElementById('answer').style.display = 'none';
        const {card} = this.state;
        // card === cards.length-1 means that you are at the end of the deck
        // So we reset card to 0 giving the appearance of the deck wrapping around
        this.props.params.cid = this.props.cards[card].card_id +1;
        if (card === this.props.cards.length-1) {
            this.setState({card: 0 },
                () => {this.updateItem(this.state.card)});
        }
        else {
            this.props.params.cid = this.props.cards[card].card_id +1;
            this.setState({
                card: this.state.card+1},
                () => {this.updateItem(this.state.card)}
            );
        }
    }
    prevCard() {
        document.getElementById('question').style.display = 'block';
        document.getElementById('answer').style.display = 'none';
        const {card} = this.state;
        this.props.params.cid = this.props.cards[card].card_id -1;
        if (this.state.card === 0){
            this.setState({card: this.props.cards.length-1}, () => {this.updateItem(this.state.card)});
        }
        else {
            this.props.params.cid = this.props.cards[card].card_id -1;
            this.setState({
                card: this.state.card - 1},
            () => {this.updateItem(this.state.card)

            })
        }
    }
    updateItem(card){
        this.context.router.push(`/stackOverview/${this.props.cards[0].stack_id}/${this.props.cards[card].card_id}`);
    }
    componentWillMount() {
        const { sid } = this.props.params;
        const {cid} = this.props.params;
        this.props.getStackOverview(sid);
        this.props.getCard(cid)
    }
    componentDidUpdate(){
        var flip = true;
        if(this.props.cards && this.props.cards[this.state.card].card_id !== parseInt(this.props.params.cid)){
            for(var i = 0; i < this.props.cards.length; i++){
                if(this.props.cards[i].card_id === parseInt(this.props.params.cid)){
                    this.setState({card: i});
                }
            }
        }
        if(document.getElementById('questionCard')) {
            document.getElementById('questionCard').addEventListener('click', switchDisplay);
        }
        function switchDisplay() {
            var questionCard = document.getElementById('questionCard');
            if (flip) {
                this.classList.toggle('flippedCard');
                setTimeout(function () {
                    document.getElementById('question').style.display = 'none';
                    document.getElementById('answer').style.display = 'inline-block';
                    flip = false;
                }, 200);
            } else {
                this.classList.toggle('flippedCard');
                setTimeout(function () {
                    document.getElementById('question').style.display = 'inline-block';
                    document.getElementById('answer').style.display = 'none';
                    flip = true;
                }, 200);
            }
        }
    }

    render() {
        // this.state.card is the index for the next and previous
        let card;
        if(this.props.cards){
            card = this.props.cards[this.state.card]
        }
        if(!card){
            return <h3>Loading...</h3>
        }
        return (
            <div>
                <FlashCardsAppBar/>
                <Paper id="questionCard">
                    <h2 id="question">
                        Question: {card.question}
                    </h2>
                    <h2 id="answer">
                        Answer: {card.answer}
                    </h2>
                </Paper>
                <Paper style={{textAlign: "center"}}>
                <div className="centered">
                    <div>click card to flip</div>
                    {/*<RaisedButton backgroundColor="#E53935" id="Wrong">WRONG</RaisedButton>*/}
                    <SkipPrevious id="previous" onClick={() => {this.prevCard()}}>PREVIOUS</SkipPrevious>
                    <RaisedButton className="centered" id="return" containerElement={<Link to={`/stackOverview/${this.props.cards[this.state.card].stack_id}/`} name="back"/>}>Return</RaisedButton>
                    <SkipNext id="next" onClick={() => {this.nextCard()}}>NEXT</SkipNext>
                    {/*<RaisedButton backgroundColor="#33CC33" id="Right">RIGHT</RaisedButton>*/}
                </div>
                </Paper>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.stack.stackCards,
        stackCards: state.stack.stackCards
    }
}

export default connect(mapStateToProps, {getCard, getStackOverview})(SingleCard);

