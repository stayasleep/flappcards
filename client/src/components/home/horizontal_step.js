import React from 'react';
import  {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';

const HorizontalStep = (props) => {
    return(
        <div>
            <Stepper linear={false} activeStep={props.stepIndex}>
                <Step>
                    <StepButton onClick={()=> props.onClickOne()}>
                        Create A Stack
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={() => props.onClickTwo()}>
                        Discover New Stacks
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={() => props.onClickThree()}>
                        Get Started Today!
                    </StepButton>
                </Step>
            </Stepper>
            <div className="stepperContent">
                <div className="stepInfo">{props.getStepContent(props.stepIndex)}</div>
                <div className="stepBtnContainer">
                    <FlatButton
                        primary={true}
                        label="Back"
                        disabled={props.stepIndex === 0}
                        onClick={props.handlePrevious()}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label="Next"
                        disabled={props.stepIndex === 2}
                        primary={true}
                        onClick={props.handleNext()}
                    />
                </div>
            </div>
        </div>
    )
};

export default HorizontalStep;