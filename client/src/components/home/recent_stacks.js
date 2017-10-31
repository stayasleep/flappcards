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
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import VerticalStep from './vertical_step';
import HorizontalStep from './horizontal_step';

class Recent extends Component {
    constructor(props){
        super(props);
        this.state={
            stepIndex: 0,
            orientation: "horizontal",
            windowWidth: window.innerWidth,
        };
        this.getStepContent = this.getStepContent.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);

    }
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
    }
    componentDidMount(){
        window.addEventListener('resize',this.handleResize);
    }
    handleResize(event){
        this.setState({windowWidth: window.innerWidth})
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
    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize);
    }

    getStepContent(stepIndex){
        switch(stepIndex) {
            case 0:
                return(
                    <div className="stepOne">
                        It&apos;s easy to get started with FlappCards!  Click on {' '}
                        <Link to="/createCards">Create Stack</Link> and make your flashcards today!{'  '}
                        All of your stacks can be found in your <Link to="/myshelf">account</Link> and can be edited{' '}
                        at any moment.
                    </div>
                );
            case 1:
                return(
                    <div className="stepTwo">
                        Okay... Maybe you&apos;re not ready!  Or your textbook hasn&apos;t arrived yet.{'  '}
                        Or, you know, something!  Whatever the reason, check out the great stacks created by {' '}
                        other members.   Head over to <Link to="/search">Search</Link> and discover something new and {' '}
                        exciting today!
                    </div>
                );
            case 2:
                return "Now that you know the basics, the rest is up to you!  Create a stack or copy a stack from those" +
                    " already available...and once that's done, hit study mode and let the learning begin!";
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
            if (typeof this.props.recentStacks === "string" ) { //ugly, but it catches our promise which originally returns a string,this only worked before bc the dispatch in catch threw it back and saved us
                return (
                    <Paper className="newUserWelcome" zDepth={2}>
                        <h2>Welcome To FlappCards!</h2>
                        <p>Here are some helpful guidelines to make the most of what we have to offer.  Once your shelf
                            has some flashcard stacks, we&apos;ll start displaying your recent stacks here.
                        </p>
                        <div className="stepperContainer">
                            {this.state.windowWidth > 480 ? (
                                    <HorizontalStep
                                        stepIndex={stepIndex}
                                        onClickOne={() => this.setState({stepIndex: 0})}
                                        onClickTwo={() => this.setState({stepIndex: 1})}
                                        onClickThree={() => this.setState({stepIndex: 2})}
                                        handleNext={()=> this.handleNext}
                                        handlePrevious={()=>this.handlePrevious}
                                        getStepContent={() => this.getStepContent(stepIndex)}
                                    />
                                ) : (
                                    <VerticalStep
                                        stepIndex={stepIndex}
                                        onClickOne={() => this.setState({stepIndex: 0})}
                                        onClickTwo={() => this.setState({stepIndex: 1})}
                                        onClickThree={() => this.setState({stepIndex: 2})}
                                        handleNext={()=> this.handleNext}
                                        handlePrevious={()=>this.handlePrevious}
                                    />
                                )
                            }

                        </div>
                    </Paper>
                )
            } else if ( !this.props.recentStacks || this.props.recentStacks.success === false){//should not be what is used for server errors
                return (
                    <Paper className="userWelcome" zDepth={2}>
                        <h2>Loading...</h2>
                        <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                            <CircularProgress size={80} thickness={6} />
                        </div>
                    </Paper>
                )
            } else if(this.props.recentStacks) {//Users who have flashcards
                return (
                    <div>
                        <Paper className="userWelcome" zDepth={2}>
                            <h2>Welcome back</h2>
                            <p>Here&apos;s your latest stack activity:</p>
                            <StackSummary cardStack={this.props.recentStacks}  />
                        </Paper>
                        <div className="middleRecentContainer">
                            <div className="middleRecentCreate">
                                <h2>Create a study stack</h2>
                                <p>Study smart! Create a study stack and get started today.</p>
                                <div className="divButton">
                                    <Link className="linkBtnGreen" to="/createCards" name="Create Stack">Create Stack</Link>
                                </div>
                            </div>
                            <div className="middleRecentSearch">
                                <h2>Learn something new today!</h2>
                                <p>Take a look at some of the great stacks created by FlappCard members.</p>
                                <div className="divButton">
                                    <Link className="linkBtn" to="/search">Search Stacks</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }else{
            return null;
        }

    }
}
function mapStateToProps(state) {
    return {
        authorized: state.auth.authorized,
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview, getStackOverview})(Recent);
