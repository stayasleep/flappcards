const validate = values => {
    const errors = {};
    if (!values.Subject) {
        errors.Subject = 'Required'
    }
    if (!values.Category) {
        errors.Category = 'Required'
    }
    if (!values.Question) {
        errors.Question = 'Required'
    }
    if (!values.Answer) {
        errors.Answer = 'Required'
    }
    return errors
};

export default validate