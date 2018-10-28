import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router,  routerReducer, routerMiddleware } from 'react-router-redux';

import { connect } from 'react-redux';
import { Route, Link  } from 'react-router-dom';
import HomePage from './homepage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import createHistory from 'history/createBrowserHistory';
import logger from 'react-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

import  productsReducer  from './reducers/products-reducer';
import  userReducer  from './reducers/user-reducer';

var initialState = {
    products : [],
    user : 'Michel'
}
const history = createHistory();
const rtMiddleware = routerMiddleware(history);
const allReducer = combineReducers({
    products : productsReducer,
    user : userReducer,
    router : routerReducer
})
var middleware = applyMiddleware(thunk, rtMiddleware);

const store = createStore(
    allReducer, 
    initialState,
    middleware,
    window.devToolsExtension && window.devToolsExtension()
    
);

console.log(store.getState());
store.dispatch((dispatch) => {
    dispatch({type : "FETCH_PRODUCTS"})
    axios.get('http://localhost:3000/products')
    .then((response) => {
        console.log('response ', response);
        dispatch({type: "PRODUCTS_RECEIVED", payload: response.data})
    })
    .catch(err => {
        console.log(err);
    })
})

ReactDOM.render(
<Provider store={store}>
    <Router history={history} path='/some-place'>
        <div>
            
            <App />
        </div>
    </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
