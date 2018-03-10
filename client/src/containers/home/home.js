import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import LoadingCircle from '../../components/common/index';
import NewUser from '../../components/home/new_user_recent';
import Recent from '../../components/home/recent';
import Community from '../../components/home/community';
import {getMyRecentStacksOverview,getCommunityStacksOverview } from '../../actions/index';
import '../../components/styles/home.css';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            stepIndex: 0,
            windowWidth: window.innerWidth,
        };
        this.getStepContent = this.getStepContent.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleResize = this.handleResize.bind(this);

    }

    componentWillMount(){
        document.title="FlappCards - Home";
    }

    componentWillReceiveProps(nextProps){
        //Set Username for for Title if stack exists
        if(nextProps.recentStacks !== this.props.recentStacks){
            if(typeof nextProps.recentStacks === "object"){
                const name = nextProps.recentStacks[0].createdBy;
                document.title = `FlappCards - ${name} Home Screen`
            }
        }
    }

    componentDidMount(){
        //even though require_auth redirects...for a split second, guest users can set these calls off which return fails
        if(this.props.authorized) {
            this.props.getMyRecentStacksOverview();
            this.props.getCommunityStacksOverview();
            window.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.handleResize);
        document.title = "FlappCards";
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

    handleNext(){
        const { stepIndex } = this.state;
        if(stepIndex <2 ) {
            this.setState({stepIndex: stepIndex + 1});
        }
    }
    handlePrevious(){
        const { stepIndex } = this.state;
        if(stepIndex > 0 ){
            this.setState({stepIndex: stepIndex -1});
        }
    }

    handleResize(){
        this.setState({windowWidth: window.innerWidth});
    }

    render(){
        return (
            <div className="home-container">
                <FlashCardsAppBar/>

                {/*Recent Stacks Loading*/}
                {!this.props.recentStacks  &&
                    <LoadingCircle name="Recent Activity"/>
                }

                {/*Server response, account is empty atm*/}
                {this.props.recentStacks && typeof this.props.recentStacks === "string" &&
                    <NewUser
                        windowWidth={this.state.windowWidth}
                        stepIndex={this.state.stepIndex}
                        clickOne={() => this.setState({stepIndex: 0})}
                        clickTwo={() => this.setState({stepIndex: 1})}
                        clickThree={() => this.setState({stepIndex: 2})}
                        onNext={() => this.handleNext}
                        onPrevious={() => this.handlePrevious}
                        onStepContent={() => this.getStepContent(this.state.stepIndex)}


                    />
                }
                {/*Server response and there is user content*/}
                {this.props.recentStacks && typeof this.props.recentStacks === "object" &&
                    <Recent recent={this.props.recentStacks}/>
                }

                {/*Community Stacks Loader*/}
                {!this.props.communityStacks &&
                    <LoadingCircle name="Community Stacks"/>
                }
                {/*Community Stacks Exist*/}
                {this.props.communityStacks && this.props.communityStacks.length >0 &&
                    <Community community={this.props.communityStacks} />
                }
                {/*Placeholder for Community Stacks DNE || Server Fail*/}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        authorized: state.auth.authorized,
        recentStacks: state.stack.recentStacks,
        communityStacks: state.stack.communityStacks
    }
}

export default connect(mapStateToProps,{getMyRecentStacksOverview, getCommunityStacksOverview})(Home);