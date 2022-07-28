import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { favorites } from './favorites';
import { Auth } from './auth';
import { Users } from './users';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            auth: Auth,
            users: Users,
            favorites,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};