import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStackOverview, stackCopy} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import EditCard from '../editCard/edit';
import AddCard from '../editCard/add';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import {GridList, GridTile} from 'material-ui/GridList';
class StackViewStacks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    handleCopy(copy){
        console.log("copy", copy);
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
                padding: 4,
                cols: 3,
            },
            header: {
                textAlign: "center"
            },
            cardDisplay: {
                textAlign: "center",
                display: "inline-block",
                width: 500,
                height:450,
                margin: 2
            },
            cardTitle: {
                titleColor: "blue"

            },
            cardActions: {

            }
        };

        if (!this.props.stackCards) {
            return <div>Loading...</div>
        }
        const cardStackList = this.props.stackCards.map((item, index) => {
            return (
                <GridTile key={index} style={styles.gridList}>
                <Card style={styles.cardDisplay}>
                    <CardTitle style={styles.cardTitle}>
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

        return (
            <div>
                <div style={styles.header}>
                        <span>{this.props.stackCards[0].subject}</span>
                </div>
        if(this.props.stackCards[0].isOwned) {
            const cardStackList = this.props.stackCards.map((item, index) => {

                <div>
                    <RaisedButton containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                    <div>
                        <AddCard/>
                    </div>
                    <div>
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
            <div>
                <div>
                    <RaisedButton name="Copy" onClick={() => {this.handleCopy(this.props.stackCards[0])}} label="copy"/>
                    <div>
                        <Chip>Number of Cards<Avatar size={32}>{this.props.stackCards.length}</Avatar></Chip>
                </div>

                <div>
                    {cardStackList}
                </div>

                    <GridList style={styles.root}>
                        {cardStackList}
                    </GridList>
                </div>
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
                {cardStackList}
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