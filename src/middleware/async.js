export default function({dispatch}) {
    return next => action => {
        console.log("async.js, async action:", action);
        // !(false) || !(true) => (true) || (false) -> You don't have the data just yet
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

        action.payload.then(response => {
            console.log("Middleware:", response);
            const newAction = {...action, payload: response};
            dispatch(newAction);
        })
    }

}