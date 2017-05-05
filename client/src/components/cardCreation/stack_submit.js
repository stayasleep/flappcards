import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'

const WizardFormThirdPage = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                Your Stack is Ready to be Submitted
            </div>
            <div>
                <button type="button" className="previous" onClick={previousPage}>Previous</button>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </div>
        </form>
    )
};
export default reduxForm({
    form: 'stackCreate', //Form name is same
    destroyOnUnmount: false,
    validate
})(WizardFormThirdPage)