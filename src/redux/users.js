import * as ActionTypes from './ActionTypes';

export const Users = (state = { errMess: null, users: []}, action) => {
    switch (action.type) {

        case ActionTypes.ADD_USERS:
            return {...state, errMess: null, users: action.payload};

        case ActionTypes.USERS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_USER:
            const user = action.payload;
            return {...state, users: state.users.concat(user)};

        default:
            return state;
    }
};
