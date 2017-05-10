import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getMyStackOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router';
import DeleteStackConfirm from '../confirmActionModal/deleteStack'
import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';



class Stacks extends Component {

    componentWillMount(){
        this.props.getMyStackOverview();
    }

    render() {
        // Doesn't need to be called "styles" but it makes it clear what it does
        const styles = {
            subHeader: {
                textAlign: "center",
                fontSize: "2em",
                fontWeight: "bold"
            },
            cardHeader: {
                fontSize: "1em",
                fontWeight: "bold"
            },
            cardActions: {
                position: "relative",
                display: "inline-flex",
                float: "right",
                marginRight: "1em"
            },
            cardText : {
                fontSize: "1em"
            }
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
                        style={styles.cardHeader}
                    />
                    <CardActions style={styles.cardActions}>
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
                            View
                        </RaisedButton>
                        <DeleteStackConfirm stackID={this.props.stacks[index]}/>
                    </CardActions>
                    <CardText style={styles.cardText}>{`Rating: ${item.stackRating}`}</CardText>
                </Card>
            )
        });
        return (
            <List>
                <Subheader style={styles.subHeader}>My Shelf</Subheader>
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