import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyStackOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router';
import DeleteStackConfirm from '../confirmActionModal/deleteStack'
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {subHeader, cardHeader, cardActions, cardText, stackSummaryDisplay} from '../utilities/stackSummaryStyle';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';

class Stacks extends Component {

    componentWillMount(){
        this.props.getMyStackOverview();
    }

    render() {
        if(!this.props.stacks){
            return (
                <List>
                    <Subheader style={subHeader}>My Shelf</Subheader>
                    <div style={{fontFamily: "Roboto, sans-serif"}}>
                        Loading...
                    </div>
                </List>
            )
        }
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <Card key={index} style={stackSummaryDisplay}>
                    <CardHeader
                        title={`Subject: ${item.subject}`}
                        subtitle={`Category: ${item.category}`}
                        avatar={<Avatar style={{float:"right"}}>{item.totalCards}</Avatar>}
                        style={cardHeader}
                    />
                    <CardActions style={cardActions}>
                        <IconButton containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
                            <RemoveRedEye hoverColor={green500}/>
                        </IconButton>
                        <DeleteStackConfirm stackID={this.props.stacks[index]}/>
                    </CardActions>
                    {/*<CardText style={cardText}>{`Rating: ${item.stackRating}`}</CardText>*/}
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