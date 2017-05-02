import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from '../../node_modules/material-ui/Card';



class ExampleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };
    handleExpand = () => {
        this.setState({expanded: true});
    };
    handleReduce = () => {
        this.setState({expanded: false});
    };

    render() {
        return (
            <div>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title="Biology"
                        subtitle="Cell organelles"

                    />
                    <CardTitle
                        title="What is the powerhouse of the cell?"
                        actAsExpander={true}
                    />

                    <CardText expandable={true}>
                        Mitochondria
                    </CardText>
                </Card>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title="Biology"
                        subtitle="Cell organelles"

                    />
                    <CardTitle
                        title="What is the powerhouse of the cell?"
                        actAsExpander={true}
                    />

                    <CardText expandable={true}>
                        Mitochondria
                    </CardText>
                </Card>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title="Biology"
                        subtitle="Cell organelles"

                    />
                    <CardTitle
                        title="What is the powerhouse of the cell?"
                        actAsExpander={true}
                    />

                    <CardText expandable={true}>
                        Mitochondria
                    </CardText>
                </Card>
            </div>


        );
    }
}
export default ExampleCard;

