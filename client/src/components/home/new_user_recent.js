import React from 'react';
import HorizontalStep from './horizontal_step';
import VerticalStep from './vertical_step';
import Paper from 'material-ui/Paper';

const NewUser = (props) => {
    return (
        <Paper className="newUserWelcome" zDepth={2} style={{textAlign: "center"}}>
            <h2>Welcome To FlappCards!</h2>
            <p>Here are some helpful guidelines to make the most of what we have to offer.  Once your shelf
                has some flashcard stacks, we&apos;ll start displaying your recent stacks here.
            </p>
            <div className="stepperContainer">
                {props.windowWidth > 480 ? (
                    <HorizontalStep
                        stepIndex={props.stepIndex}
                        onClickOne={props.clickOne}
                        onClickTwo={props.clickTwo}
                        onClickThree={props.clickThree}
                        handleNext={props.onNext}
                        handlePrevious={props.onPrevious}
                        getStepContent={props.onStepContent}
                    />
                    ) : (
                   <VerticalStep
                       stepIndex={props.stepIndex}
                       onClickOne={props.clickOne}
                       onClickTwo={props.clickTwo}
                       onClickThree={props.clickThree}
                       handleNext={props.onNext}
                       handlePrevious={props.onPrevious}
                   />
                    )
                }
            </div>
        </Paper>
    )
};

export default NewUser;