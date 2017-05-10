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
import {GridList, GridTile} from 'material-ui/GridList';
class StackViewStacks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    handleCopy(copy){
        console.log(copy)
        this.props.stackCopy(copy);
    };

    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto'
            },
            header: {
                textAlign: "center"
            },
            cardDisplay: {
                textAlign: "center",
                display: "inline-block",
                width: 500,
                height:450
            }
        };

        if (!this.props.stackCards) {
            return <div>Loading...</div>
        }
        let stackView;
        if(this.props.stackCards[0].isOwned) {
            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                    <GridTile key={index} cols={3} style={styles.gridList}>
                        <Card style={styles.cardDisplay}>
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
                    </GridTile>
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
                    <GridTile key={index} cols={3} style={styles.gridList}>
                        <Card style={styles.cardDisplay}>
                            <CardTitle>
                                {item.question}
                            </CardTitle>
                            <CardText>
                                {item.answer}
                            </CardText>
                        </Card>
                    </GridTile>
                )
            });
            stackView =
                <div>
                    <div>
                        <RaisedButton name="Copy" onClick={() => {this.handleCopy(this.props.stackCards[0])}} label="copy"/>
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
                <div style={styles.header}>
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