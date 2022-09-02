import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { getUsers } from "./actions/users.actions";
import { getPosts } from './actions/post.actions';


const store = legacy_createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  
);
