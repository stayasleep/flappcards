import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import StackViewStacks from './stackView_stacks';
import {getStackOverview} from '../../actions/index';
import {connect} from 'react-redux';

class Stacks extends Component {

    componentWillMount() {
    const { sid } = this.props.params; // To pull from the url
    this.props.getStackOverview(sid);
    document.title="FlappCards - Stack Overview";
    console.log('stack_ov parent comp will mount',this.props);
    }
    componentWillUnmount(){
        document.title="FlappCards";
    }
    //sending props with stack so we can check state of users authorized bool
    render() {
        console.log('stack_ov parent comp render',this.props);
        return (
            <div>
                <FlashCardsAppBar/>
                <StackViewStacks authCopy={this.props.authorized} />
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards,
        newStackID: state.stack.newStackID,
        authorized: state.auth.authorized
    }
}
// export default connect(mapStateToProps, {getStackOverview, stackCopy})(StackViewStacks);
export default connect(mapStateToProps,{getStackOverview})(Stacks);