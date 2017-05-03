import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStack} from '../actions/index'
import {Link} from 'react-router'

class Recent extends Component{
    componentWillMount(){
        this.props.getStack();
    }

    render() {
        return (
            <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">functions</i>
          <span>Math</span>
            <span>Calc 1</span>
            <span># of cards</span>
            <span>user: brian</span>
          <span className="mdl-list__item-text-body">
            See your deck
              Rating:
              Created On:
          </span>
        </span>
                <span className="mdl-list__item-secondary-content">
                    <Link to="/stackOverview" name="Stacks"><i className="material-icons">visibility</i></Link>
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

export default connect(mapStateToProps, {getStack})(Recent);