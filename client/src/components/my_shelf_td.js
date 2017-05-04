import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyStackOverview} from '../actions/index'
import {Link} from 'react-router'

class Stacks extends Component{
    componentWillMount(){
        this.props.getMyStackOverview();
    }

    render() {
        console.log("myshelf: ",this.props);
        if(!this.props.stacks){
            return <div>Loading...</div>
        }
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="mdl-data-table__cell--non-numeric">{item.subject}: {item.category}</td>
                    <td>{item.number}</td>
                    <td>{item.stackRating}</td>
                    <td>
                        <Link to="/single_card" name="SingleCard"><button className="mdl-button mdl-js-button mdl-button--primary">
                            <i className="material-icons">visibility</i>
                        </button></Link>
                    </td>
                </tr>
            )
        });
        return (
            <tbody>{stacksList}</tbody>
        );
    }
}
function mapStateToProps(state) {
    return {
        stacks: state.stack.stacks
    }
}

export default connect(mapStateToProps, {getMyStackOverview})(Stacks);