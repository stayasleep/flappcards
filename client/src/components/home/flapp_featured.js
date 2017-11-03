import React from 'react';
import { Link } from 'react-router';
import {List} from 'material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';
import StackSummary from '../utilities/renderStackSummary';
import LoadingCircle from '../common/index';

const FlappFeatured = (props) => {
    return(
        <div className="flappFeaturedParent">
            <Paper className="flappFeatPaper">
                {/*on app load*/}
                {!props.featured &&
                    <LoadingCircle name="Our Featured Stacks"/>
                }
                {/*server success*/}
                {props.featured &&
                    <div>
                        <h1 className="featStackTitle">Our Featured Stacks</h1>
                        <StackSummary className="featStackSumm" cardStack={props.featured}/>
                        <div className="flappFeatContainer">
                            <div className="containerText">Find more of what you&apos;re looking for today!</div>
                            <RaisedButton
                                label="Search Stacks"
                                containerElement={<Link to={`/search`} className="featFlappSearch" name="search"/>}
                                className="featuredButton"
                                labelColor={"#ffffff"}
                                backgroundColor={"#1bb76e"}
                            />
                        </div>
                    </div>
                }
                {/*server fail*/}
                {props.featuredErr &&
                    <List>
                        <Subheader style={subHeader}>Our Featured Stacks</Subheader>
                        <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                            There's tons of neat stacks on FlappCards. <Link to="/search">Search</Link> around the
                            community and checkout what&apos;s happening today!
                        </div>
                    </List>
                }
            </Paper>
        </div>

    )
};

export default FlappFeatured;