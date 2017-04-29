const wait = ms => new Promise(resolve => setTimeout(resolve,ms));

const asyncReg = (values) => {
    return wait(1000).then(() => {
        if ([ 'user@mail.com', 'user2@mail.com'].includes(values.email)){
            throw {email: 'Email already Exists'
            }
        }
    })
};

export default asyncReg;