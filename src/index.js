import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
// import reduxPromise from 'redux-promise'
import async from './middleware/async';

import App from './components/app';
import ViewList from './components/view_list';
import AddForm from './components/addForm';
import ViewTodo from './components/viewTodo';

import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(async)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={ViewList}/>
                <Route path="new-todo" component={AddForm}/>
                <Route path="todo/:id" component={ViewTodo}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
