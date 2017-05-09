import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStackOverview} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import EditCard from '../editCard/edit';
import AddCard from '../editCard/add';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';

import {GridList, GridTile} from 'material-ui/GridList';
class StackViewStacks extends Component{


    static contextTypes = {
        router: PropTypes.object
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
                overflowY: 'auto',
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
            },
            cardTitle: {

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

        return (
            <div>
                <div style={styles.header}>
                        {/* The subject and category are referenced once in this component, so we just pull off the category from the first card
                         (this.props.stackCards[0]) since it applies to all cards in this view.
                         */}
                        <span>{this.props.stackCards[0].subject}</span>
                </div>
                <div>
                    <div>
                        <span>{this.props.stackCards[0].category}</span>
                    </div>

                    <div>
                        <span>Made by: {this.props.stackCards[0].createdBy}</span>
                    </div>

                    <div>
                            <RaisedButton
                                containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>
                                Study
                            </RaisedButton>
                        <div>
                            <AddCard/>
                        </div>
                        <div>
                            {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                            <Badge
                                badgeContent={this.props.stackCards.length}
                                primary={true}
                            >
                                Number of Cards
                            </Badge>
                        </div>
                    </div>
                </div>
                <div style={styles.root}>
                {cardStackList}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        cards: state.stack.all,
        subject: state.stack.subj,
        course: state.stack.course,
        creator: state.stack.createdBy,
        number: state.stack.number,
        stackCards: state.stack.stackCards
    }
}

export default connect(mapStateToProps, {getStackOverview})(StackViewStacks);