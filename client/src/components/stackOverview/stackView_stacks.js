import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {getStackOverview, stackCopy} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import EditCard from '../editCard/edit';
import AddCard from '../editCard/add';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';
import Divider from 'material-ui/Divider';
import {cardDisplay, cardHeader, cardDivider, cardText, questionText, stackOverviewCardActions, answerText, chip, mediumIcon, medium, header } from '../utilities/stackSummaryStyle';
import {blue500} from 'material-ui/styles/colors';
class StackViewStacks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    handleCopy(copy){
        this.props.stackCopy(copy);
    };

    render() {

        const styles = {
            cardHeader: {
                backgroundColor: {blue500}
            }
        };
        if (!this.props.stackCards) {
            return <div>Loading...</div>
        }
        let stackView;
        if(this.props.stackCards[0].isOwned) {
            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                        <Card key={index} style={cardDisplay}>
                            <CardHeader
                                style={cardHeader}
                                title={`Question: ${item.question}`}
                                titleStyle={{blue500}}
                                actAsExpander={true}
                            />
                            <Divider style={cardDivider} />
                            <CardText style={answerText} expandable={true}>
                                Answer: {item.answer}
                            </CardText>
                            <CardActions style={stackOverviewCardActions}>
                                <EditCard cardID={this.props.stackCards[index]}/>
                                <DeleteCardConfirm cardID={this.props.stackCards[index]}/>
                            </CardActions>
                        </Card>
                )
            });
            // Bitten by a snake while struck by lightning on this part right here
            stackView=
                <div>
                    <RaisedButton containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                    <div>
                        <AddCard/>
                        <Chip style={chip}><Avatar size={32}>{this.props.stackCards.length}</Avatar>Number Of Cards</Chip>
                    </div>
                    {cardStackList}
                </div>
        }
        else if(this.props.stackCards){

            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                        <Card key={index}>
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
                        <IconButton iconStyle={mediumIcon} style={medium} label="Copy" tooltip="Copy Stack" tooltipPosition="top-center" onTouchTap={() => {this.handleCopy(this.props.stackCards[0])}}>
                            <ContentContentCopy/>
                        </IconButton>
                        <div>
                            {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                            <Chip style={chip}><Avatar>{this.props.stackCards.length}</Avatar>Number of Cards</Chip>
                        </div>
                    </div>
                    {cardStackList}
                </div>
        }
        return (
            <div>
                <div style={header}>
                <div>
                    <span>{`Subject: ${this.props.stackCards[0].subject}`}</span>
                </div>
                <div>
                    <span>{`Category: ${this.props.stackCards[0].category}`}</span>
                </div>
                <div>
                    <span>{`Made by: ${this.props.stackCards[0].createdBy}`}</span>
                </div>
                </div>
                {stackView}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards,
        newStackID: state.stack.newStackID
    }
}

export default connect(mapStateToProps, {getStackOverview, stackCopy})(StackViewStacks);