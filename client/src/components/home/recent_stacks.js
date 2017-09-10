import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Subheader from 'material-ui/Subheader';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {getMyRecentStacksOverview, getStackOverview} from '../../actions/index'
import {subHeader} from '../utilities/stackSummaryStyle';
import {emptyRecent} from './../styles/home.css';
import StackSummary from '../utilities/renderStackSummary';
import {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class Recent extends Component {
    constructor(props){
        super(props);
        this.state={
            stepIndex: 0,
        };
    }
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
    }
    handleNext(){
        const { stepIndex } = this.state;
        if(stepIndex < 2){
            this.setState({stepIndex: stepIndex + 1});
        }
    };
    handlePrevious(){
        const { stepIndex } = this.state;
        if(stepIndex > 0 ){
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    getStepContent(stepIndex){
        switch(stepIndex) {
            case 0:
                return(
                    <div className="stepOne">
                        It&apos;s easy to get started with FlappCards!  Click on {' '}
                        <Link to="/createCards">Create Stack</Link> and make your flashcards today!{'  '}
                        Each stack ends up in your <Link to="/myshelf">account</Link> and can be updated (or deleted){' '}
                        at any moment.
                    </div>
                );
            case 1:
                return(
                    <div className="stepTwo">
                        Okay... Maybe you&apo;re not ready!  Or your textbook hasn&apos;t arrived yet.{'  '}
                        Or, you know, something!  Whatever the reason, check out the great stacks created by {' '}
                        other members.   Head over to <Link to="/search">Search</Link> and discover something new and {' '}
                        exciting today!
                    </div>
                );
            case 2:
                return "Now that you know the basics, the rest is up to you!  Create a stack or copy a stack from those" +
                    "already available...and once that's done, hit study mode and let the learning begin!";
            default:
                return "Never fear, FlappCards is here!  Studying doesn't have to be boring, create your own flashcard stack" +
                    "whenever you're in need of some study time or browse the available stacks in the community.  If you see" +
                    "something exciting, hit the 'copy' icon and ";
        }
    }

    render() {
        const { stepIndex } = this.state;

        if(this.props.authorized) {
            //Users who do not have any stacks in there account
            if (!this.props.recentStacks || typeof this.props.recentStacks === "string" ) { //ugly, but it catches our promise which originally returns a string,this only worked before bc the dispatch in catch threw it back and saved us
                return (
                <Paper className="newUserWelcome" zDepth={2}>
                    <h2>Welcome To FlappCards!</h2>
                    <p>Here are some helpful guidelines to make the most of what we have to offer.  Once your shelf
                        has some flashcard stacks, we&apos;ll start displaying them here for your convenience.
                    </p>
                    <div className="stepperContainer">
                    <Stepper linear={false} activeStep={stepIndex}>
                        <Step>
                            <StepButton onClick={()=> this.setState({stepIndex: 0})}>
                                Create A Stack
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                Discover New Stacks
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                Now Get Studying!
                            </StepButton>
                        </Step>
                    </Stepper>
                    <div className="stepperContent">
                        <div className="stepInfo">{this.getStepContent.bind(this)(stepIndex)}</div>
                        <div className="stepBtnContainer">
                            <FlatButton
                                primary={true}
                                label="Back"
                                disabled={stepIndex === 0}
                                onClick={this.handlePrevious.bind(this)}
                                style={{marginRight: 12}}
                            />
                            <RaisedButton
                                label="Next"
                                disabled={stepIndex === 2}
                                primary={true}
                                onClick={this.handleNext.bind(this)}
                            />
                        </div>
                    </div>
                    </div>
                </Paper>
                )
            } else if (this.props.recentStacks.success === false){//should not be what is used for server errors
                return (
                    <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                        <CircularProgress size={80} thickness={6} />
                    </div>
                )
            } else if (this.props.recentStacks) {//Users who have flashcards
                return (
                    <StackSummary cardStack={this.props.recentStacks} title={"Recent Stacks"} />
                );
            }
        }else{
            return null;
        }

    }
}
function mapStateToProps(state) {
    return {
        authorized: state.auth.authorized, //ask andres: if authorized, render recent_stack o/w do not render
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview, getStackOverview})(Recent);
