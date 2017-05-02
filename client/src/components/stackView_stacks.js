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
                        <div className="mdl-card__title-text">What is the power house of the cell?</div>
                    </div>
                    <div className="mdl-card__supporting-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a href="page09.html" className="mdl-button mdl-js-button mdl-js-ripple-effect">
                            Study
                        </a>
                    </div>
                    <div className="mdl-card__menu">
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">delete_forever</i>
                        </button>
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