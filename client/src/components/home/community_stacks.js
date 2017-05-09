import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import {getCommunityStacksOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {GridTile} from 'material-ui/GridList';

class Community extends Component {
    componentWillMount() {
        this.props.getCommunityStacksOverview();
    }

    viewStack(stackInfo) {
        console.log("stackID", stackInfo);
        this.props.getStackOverview(stackInfo.stack_id);

    }

    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            gridList: {
                width: 500,
                height: 450,
                padding: 4,
                cols: 1
            },
            header: {
                textAlign: "center"
            },
            cardDisplay: {
                textAlign: "center",
                display: "inline-block",
                width: 500,
                height:450,
            },
            cardTitle: {

            },
            cardActions: {

            },
            chip: {
                paddingRight: 0
            }
        };

        if (!this.props.communityStacks) {
            return (
                <div>
                    <h1>Community Stacks:</h1>
                    <div>
                        Oops! Looks like you own all the community content!
                    </div>
                </div>
            )
        }
        const communityStacksList = this.props.communityStacks.map((item, index) => {
            return (
                <GridTile key={index} style={styles.gridList}>
                <Card style={styles.cardDisplay}>
                    <CardHeader
                        title={item.subject}
                        subtitle={item.category}
                    />
                    <CardText>
                        Created by: {item.createdBy}
                        Total Cards: {item.totalCards}
                        Created On: {item.createdOn}
                        Rating: {item.stackRating}
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${this.props.communityStacks[index].stack_id}`} name="stackOverview"/>}
                            onClick={() => {this.viewStack(this.props.communityStacks[index])}}>
                            View
                        </RaisedButton>
                    </CardActions>
                </Card>
                </GridTile>
            )
        });
        return (
            <div>
                <h1>Community Stacks:</h1>
                {communityStacksList}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        communityStacks: state.stack.communityStacks
    }
}

export default connect(mapStateToProps, {getCommunityStacksOverview, getStackOverview})(Community);