import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStack} from '../actions/index'

class Community extends Component{
    componentWillMount(){
        this.props.getStack();
    }

    render() {
        return (
            <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">functions</i>
          <span>Math</span>
            <span>Calc 2</span>
			<span>user:Brian</span>
			<span>Rating 4/5</span>
            <span># items</span>
          <span className="mdl-list__item-text-body">
            See Calc 2 deck
          </span>
        </span>
                <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">visibility</i></a>
        </span>
            </li>
        );
    }
}
function mapStateToProps(state) {
    return {
        stacks: state
    }
}

export default connect(mapStateToProps, {getStack})(Community);