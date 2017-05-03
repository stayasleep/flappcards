import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import stackReducer from './stack_reducer'

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    stack: stackReducer
});

export default rootReducer;