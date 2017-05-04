import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStackOverview} from '../actions/index'
import {Link} from 'react-router'

class Stacks extends Component{
    componentWillMount(){
        this.props.getStackOverview();
    }

    render() {
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="mdl-data-table__cell--non-numeric">{item.subject}: {item.course}</td>
                    <td>{item.number}</td>
                    <td>{item.rating}</td>
                    <td>
                        <Link to="/single_card" name="SingleCard"><button className="mdl-button mdl-js-button mdl-button--primary">
                            <i className="material-icons">visibility</i>
                        </button></Link>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                {stacksList}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        stacks: state.stacks,
        subject: state.stack.subj,
        course: state.stack.course,
        rating: state.stack.creator,
        number: state.stack.number
    }
}

export default connect(mapStateToProps, {getStackOverview})(Stacks);