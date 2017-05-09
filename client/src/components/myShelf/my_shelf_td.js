import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getMyStackOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router';
import DeleteStackConfirm from '../confirmActionModal/deleteStack'
import RaisedButton from 'material-ui/RaisedButton'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import Avatar from 'material-ui/Avatar';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class Stacks extends Component {

    componentWillMount(){
        this.props.getMyStackOverview();
    }


    render() {
        const subHeader = {
            textAlign: "center",
            fontSize: "2em",
            fontWeight: "bold"
        };
        const cardHeader = {
            fontSize: "1em",
            fontWeight: "bold"
        };
        const cardActions = {
            position: "relative",
            display: "inline-flex",
            float: "right",
            marginRight: "1em"
        };
        const cardText = {
            fontSize: "1em"
        };

        if(!this.props.stacks){
            return <div>Loading...</div>
        }
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <Card key={index}>
                    <CardHeader
                        title={`Subject: ${item.subject}`}
                        subtitle={`Category: ${item.category}`}
                        avatar={<Avatar>{item.totalCards}</Avatar>}
                        style={cardHeader}
                    />
                    <CardActions style={cardActions}>
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
                            View
                        </RaisedButton>
                        <DeleteStackConfirm stackID={this.props.stacks[index]}/>
                    </CardActions>
                    <CardText style={cardText}>{`Rating: ${item.stackRating}`}</CardText>
                </Card>
            )
        });
        return (
            <List>
                <Subheader style={subHeader}>My Shelf</Subheader>
                    {stacksList}
            </List>

        );


    }
}
function mapStateToProps(state) {

    return {
        stacks: state.stack.stacks
    }
}

export default connect(mapStateToProps, {getMyStackOverview, getStackOverview})(Stacks);