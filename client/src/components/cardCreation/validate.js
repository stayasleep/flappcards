const validate = values => {
    const errors = {};

    const requiredFields = [ 'subject', 'category'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[field] = `Required`
        }
    });
    if (!values.stack || !values.stack.length) {
        errors.stack = { _error: 'At least one card must be entered' }
    } else {
        const cardArrayErrors = [];
        values.stack.forEach((stack, index) => {
            const cardErrors = {};
            if (!stack || !stack.question) {
                cardErrors.question = 'Required';
                cardArrayErrors[index] = cardErrors
            }
            if (!stack || !stack.answer) {
                cardErrors.answer = 'Required';
                cardArrayErrors[index] = cardErrors
            }
        });
        if(cardArrayErrors.length) {
            errors.stack = cardArrayErrors
        }
    }

    return errors
};

export default validate;