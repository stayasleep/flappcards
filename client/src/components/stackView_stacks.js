import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStack} from '../actions/index'

class StackViewStacks extends Component{
    componentWillMount(){
        this.props.getStack();
    }

    render() {
        console.log(this.props)
        const stackList = this.props.stacks.map((item, index) => {
            return (
            <div className="mdl-card mdl-shadow--2dp demo-card-square">
                <div className="mdl-card__title mdl-card--expand">
                    <div className="mdl-card__title-text">{item.question}</div>
                </div>
                <div className="mdl-card__supporting-text">
                    {item.answer}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <Link to="/single_card" name="SingleCard">
                        Edit
                    </Link>
                </div>
                <div className="mdl-card__menu">
                    <Link to="/stackOverview" name="Stacks">
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">delete_forever</i>
                        </button>
                    </Link>
                </div>
            </div>
            )
        });

        return (
                <div>
                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer"/>
                        <div className="mdl-cell mdl-cell--6-col">
                            <span>{this.props.subject}</span>
                        </div>
                        <div className="mdl-layout-spacer"/>
                    </div>
                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer">
                            <div className="mdl-cell mdl-cell--6-col">
                                <span>{this.props.course}</span>
                            </div>
                            <div className="mdl-layout-spacer"/>
                        </div>
                        <div className="mdl-grid">
                            <div className="mdl-layout-spacer"/>
                            <div className="mdl-cell mdl-cell--6-col">
                                <span>Made by {this.props.creator}</span>
                            </div>
                            <div className="mdl-layout-spacer"/>
                        </div>

                        <div className="mdl-grid">
                            <div className="mdl-layout-spacer"/>
                            <div className="mdl-cell mdl-cell--2-col">
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    Study
                                </button>
                            </div>
                            <div className="mdl-cell mdl-cell--2-col">
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    Add Cards
                                </button>
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
        stacks: state.stack.all,
        subject: state.stack.subj,
        course: state.stack.course,
        creator: state.stack.creator,
        number: state.stack.number
    }
}

export default connect(mapStateToProps, {getStack})(StackViewStacks);