import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStackOverview} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import EditCard from '../editCard/edit'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

class StackViewStacks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    enterStudyMode(stackID) {
        this.context.router.push('/single_card');
    }

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

        return (
            <div>
                <div style={header} className="mdl-grid">

                    <div className="mdl-cell mdl-cell--6-col">
                        {/* The subject and category are referenced once in this component, so we just pull off the category from the first card
                         (this.props.stackCards[0]) since it applies to all cards in this view.
                         */}
                        <span>{this.props.stackCards[0].subject}</span>
                    </div>

                </div>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <span>{this.props.stackCards[0].category}</span>
                    </div>

                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer"/>
                        <div className="mdl-cell mdl-cell--3-col">
                            <span>Made by {this.props.creator}</span>
                        </div>
                    </div>

                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col">
                            <RaisedButton
                                containerElement={<Link to="/single_card" name="SingleCard"/>}
                                onClick={() => {this.enterStudyMode(8)}}>
                                Study
                            </RaisedButton>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col">
                            <Link to="/createCards" name="Add">
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    Add Cards
                                </button>
                            </Link>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col">
                            {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                            <span className="mdl-badge" data-badge={this.props.stackCards.length}>Number of Cards: </span>
                        </div>
                    </div>
                </div>
                {cardStackList}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        cards: state.stack.all,
        subject: state.stack.subj,
        course: state.stack.course,
        creator: state.stack.creator,
        number: state.stack.number,
        stackCards: state.stack.stackCards
    }
}

export default connect(mapStateToProps, {getStackOverview})(StackViewStacks);