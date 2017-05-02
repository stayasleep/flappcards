import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStack} from '../actions/index'

class StackViewStacks extends Component{
    componentWillMount(){
        this.props.getStack();
    }

    render() {
        return (
                <div className="mdl-card mdl-shadow--2dp demo-card-square">
                    <div className="mdl-card__title mdl-card--expand">
                        <div className="mdl-card__title-text">question</div>
                    </div>
                    <div className="mdl-card__supporting-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <Link to="/single_card" name="SingleCard">
                            Study
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
        );
    }
}
function mapStateToProps(state) {
    return {
        stacks: state
    }
}

export default connect(mapStateToProps, {getStack})(StackViewStacks);