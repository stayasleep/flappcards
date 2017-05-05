import React, {Component, PropTypes} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import StackCreation from './create_stack'
import CardCreation from './card_input'
import StackSubmission from './stack_submit'
class CreateCards extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        }
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    render (){
        const { onSubmit } = this.props;
        const { page } = this.state;
        return (
            <div>
                <FlashCardsAppBar/>
                {page === 1 && <StackCreation onSubmit={this.nextPage}/>}
                {page === 2 && <CardCreation previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <StackSubmission previousPage={this.previousPage} onSubmit={onSubmit}/>}
            </div>
        )
    }
}

export default CreateCards