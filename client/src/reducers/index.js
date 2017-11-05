import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import stackReducer from './stack_reducer'
import profileReducer from './profile_reducer'
//test
import resetRouteValid from './reset_route';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    stack: stackReducer,
    profile: profileReducer,
    reset: resetRouteValid
});
// const appReducer = combineReducers({
//     form: formReducer,
//     auth: authReducer,
//     stack: stackReducer,
//     profile: profileReducer,
//     reset: resetRouteValid
// });
//
// const rootReducer = (state,action) =>{
//     if(action.type === "UNAUTH_USER"){
//         console.log('apppp reducerrrrrrrr');
//         state = undefined;
//     }
//     return appReducer(state,action);
// };

export default rootReducer;