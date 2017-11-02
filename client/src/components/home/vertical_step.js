import React from 'react';
import {Link} from 'react-router';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const VerticalStep = (props) => {
    function makeButtons(step){
        return(
            <div>
                <RaisedButton
                    label="Next"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={props.handleNext()}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={props.handlePrevious()}
                    />
                )}
            </div>
        )
    }
    return(
        <Stepper linear={false} activeStep={props.stepIndex} orientation="vertical">
            <Step>
                <StepButton onClick={() => props.onClickOne()}>
                    Create A Stack
                </StepButton>
                <StepContent>

                        <div className="stepOne">
                            It&apos;s easy to get started with FlappCards!  Click on {' '}
                            <Link to="/createCards">Create Stack</Link> and make your flashcards today!{'  '}
                            All of your stacks can be found in your <Link to="/myshelf">account</Link> and can be edited{' '}
                            at any moment.
                        </div>

                    {makeButtons(0)}
                </StepContent>
            </Step>
            <Step>
                <StepButton onClick={() => props.onClickTwo()}>
                    Discover New Stacks
                </StepButton>
                <StepContent>

                        <div className="stepTwo">
                            Okay... Maybe you&apos;re not ready!  Or your textbook hasn&apos;t arrived yet.{'  '}
                            Or, you know, something!  Whatever the reason, check out the great stacks created by {' '}
                            other members.   Head over to <Link to="/search">Search</Link> and discover something new and {' '}
                            exciting today!
                        </div>

                    {makeButtons(1)}
                </StepContent>
            </Step>
            <Step>
                <StepButton onClick={() => props.onClickThree()}>
                    Get Started Today!
                </StepButton>
                <StepContent>
                    <p>
                        Now that you know the basics, the rest is up to you!  Create a stack or copy a stack from those{' '}
                        already available...and once that's done, hit study mode and let the learning begin!
                    </p>
                    {makeButtons(2)}
                </StepContent>
            </Step>
        </Stepper>
    )
};
export default VerticalStep;