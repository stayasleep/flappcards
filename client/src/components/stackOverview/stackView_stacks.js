import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStack} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

class StackViewStacks extends Component{
    componentWillMount(){
        this.props.getStack();
    }

    render() {
        const header = {
            textAlign: "center"
        };
        const cardDisplay = {
            display: "inline-block",
            textAlign: "center"
        };
        const stackList = this.props.cards.map((item, index) => {
            return (
            <Card style={cardDisplay} key={index}>
                <CardTitle>
                    {item.question}
                </CardTitle>
                <CardText>
                    {item.answer}
                </CardText>
                <CardActions>
                    <RaisedButton>Edit</RaisedButton>
                    <DeleteCardConfirm/>
                </CardActions>
            </Card>
            )
        });

        return (
                <div>
                    <div style={header} className="mdl-grid">

                        <div className="mdl-cell mdl-cell--6-col">
                            <span>{this.props.subject}</span>
                        </div>

                    </div>
                    <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--3-col">
                                <span>{this.props.course}</span>
                            </div>

                        <div className="mdl-grid">
                            <div className="mdl-layout-spacer"/>
                            <div className="mdl-cell mdl-cell--3-col">
                                <span>Made by {this.props.creator}</span>
                            </div>
                        </div>

                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--3-col">
                                <Link to="/single_card" name="SingleCard">
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    Study
                                </button>
                                </Link>
                            </div>
                            <div className="mdl-cell mdl-cell--2-col">
                                <Link to="/createCards" name="Add">
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    Add Cards
                                </button>
                            </Link>
                            </div>
                            <div className="mdl-cell mdl-cell--2-col">
                                <span className="mdl-badge" data-badge={this.props.number}>Number of Cards: </span>
                            </div>
                        </div>
                    </div>
                    {stackList}
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
        number: state.stack.number
    }
}

export default connect(mapStateToProps, {getStack})(StackViewStacks);