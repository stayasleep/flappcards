const validate = values => {
    const errors = {};

    const requiredFields = [ 'subject', 'category'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[field] = `Required`
        }else if(/^\s+$/.test(values[field])){
            errors[field]="Field must contain a value!";
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
                cardArrayErrors[index] = cardErrors;
            }else if(!stack || stack.question.length > 400){
                cardErrors.question = "Question must be fewer than 400 characters";
                cardArrayErrors[index] = cardErrors;
            }else if(stack.question && /^\s+$/.test(stack.question)){
                cardErrors.question="Question cannot be empty spaces";
                cardArrayErrors[index] = cardErrors;
            }

            if (!stack || !stack.answer) {
                cardErrors.answer = 'Required';
                cardArrayErrors[index] = cardErrors
            }else if(!stack || stack.answer.length >400){
                cardErrors.answer = "Answer must be fewer than 400 characters";
                cardArrayErrors[index]=cardErrors;
            }else if(stack.answer && /^\s+$/.test(stack.answer)){
                cardErrors.answer="Answer cannot be empty spaces";
                cardArrayErrors[index] = cardErrors;
            }
        });
        if(cardArrayErrors.length) {
            errors.stack = cardArrayErrors
        }
    }

    return errors
};

export default validate;