import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStackOverview, stackCopy} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import EditCard from '../editCard/edit';
import AddCard from '../editCard/add';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';

class StackViewStacks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    handleCopy(copy){
        this.props.stackCopy(copy);
    };

    render() {
        if (!this.props.stackCards) {
            return <div>Loading...</div>
        }
        const header = {
            textAlign: "center"
        };
        const cardDisplay = {
            display: "inline-block",
            textAlign: "center"
        };
        let stackView;
        if(this.props.stackCards){
            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                    <Card style={cardDisplay} key={index}>
                        <CardTitle>
                            {item.question}
                        </CardTitle>
                        <CardText>
                            {item.answer}
                        </CardText>
                        <CardActions>
                            <EditCard cardID={this.props.stackCards[index]}/>
                            <DeleteCardConfirm cardID={this.props.stackCards[index]}/>
                        </CardActions>
                    </Card>
                )
            });
            stackView =
                <div>
                    <RaisedButton containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                    <div>
                        <AddCard/>
                    </div>
                    <div>
                        {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                        <Badge badgeContent={this.props.stackCards.length} primary={true}>Number of Cards</Badge>
                    </div>
                    {cardStackList}
                </div>
        }
        else if(this.props.stackCards){
            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                    <Card style={cardDisplay} key={index}>
                        <CardTitle>
                            {item.question}
                        </CardTitle>
                        <CardText>
                            {item.answer}
                        </CardText>
                    </Card>
                )
            });
            stackView =
                <div>
                    <div>
                        <RaisedButton name="Copy" onClick={this.handleCopy(this.props.stackCards)} label="copy"/>
                        <div>
                            {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                            <Badge badgeContent={this.props.stackCards.length} primary={true}>Number of Cards</Badge>
                        </div>
                    </div>
                    {cardStackList}
                </div>
        }
        return (
            <div>
                <div style={header}>
                    <span>{this.props.stackCards[0].subject}</span>
                </div>
                <div>
                    <span>{this.props.stackCards[0].category}</span>
                </div>
                <div>
                    <span>Made by: {this.props.stackCards[0].createdBy}</span>
                </div>
                {stackView}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards
    }
}

export default connect(mapStateToProps, {getStackOverview, stackCopy})(StackViewStacks);