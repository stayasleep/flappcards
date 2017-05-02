import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStack} from '../actions/index'

class Stacks extends Component{
    componentWillMount(){
        this.props.getStack();
    }

    render() {
        return (
            <tr>
                <td className="mdl-data-table__cell--non-numeric">{name}</td>
                <td>10</td>
                <td>(Calculated Value)</td>
                <td>
                    <button className="mdl-button mdl-js-button mdl-button--primary">
                        <i className="material-icons">visibility</i>
                    </button>
                </td>
            </tr>
        );
    }
}
function mapStateToProps(state) {
    return {
        stacks: state
    }
}

export default connect(mapStateToProps, {getStack})(Stacks);