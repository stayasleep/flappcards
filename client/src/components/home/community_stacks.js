import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStack} from '../../actions/index'

class Community extends Component{
    // componentWillMount(){
    //     this.props.getStack();
    // }

    render() {
        return (
            <li>
        <span>
          <i className="material-icons mdl-list__item-avatar">functions</i>
          <span>Math</span>
            <span>Calc 2</span>
			<span>user:Brian</span>
			<span>Rating 4/5</span>
            <span># items</span>
          <span>
            See Calc 2 deck
              Rating:
              Created On:
          </span>
        </span>
                <span>
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

export default connect(mapStateToProps, {getStack})(Community);