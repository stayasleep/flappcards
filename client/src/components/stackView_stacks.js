import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStack} from '../actions/index'
import Confirm from '../components/confirmActionModal/confirm'

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
        }
        const stackList = this.props.cards.map((item, index) => {
            return (
            <div style={cardDisplay} key={index} className="mdl-card mdl-shadow--2dp demo-card-square">
                <div className="mdl-card__title mdl-card--expand">
                    <div className="mdl-card__title-text">{item.question}</div>
                </div>
                <div className="mdl-card__supporting-text">
                    {item.answer}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                        Edit
                    <Link to="/stackOverview" name="Stacks">
                        <Confirm/>
                    </Link>
                </div>
                <div className="mdl-card__menu">
                </div>
            </div>
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
                            <div className="mdl-layout-spacer"/>
                        </div>

                        <div className="mdl-grid">
                            <div className="mdl-layout-spacer"/>
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
                            <div className="mdl-layout-spacer"/>
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