import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStackOverview} from '../actions/index'
import {Link} from 'react-router'

class Stacks extends Component{
    componentWillMount(){
        this.props.getStackOverview();
    }

    render() {
        return (
            <tr>
                <td className="mdl-data-table__cell--non-numeric">{name}</td>
                <td>10</td>
                <td>(Calculated Value)</td>
                <td>
                    <Link to="/single_card" name="SingleCard"><button className="mdl-button mdl-js-button mdl-button--primary">
                        <i className="material-icons">visibility</i>
                    </button></Link>
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

export default connect(mapStateToProps, {getStackOverview})(Stacks);