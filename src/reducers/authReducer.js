import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn : false,
    userId : null,
    userName : null,
    userEmail : null
};


export default (state =INITIAL_STATE, action) => {

    switch(action.type) {
        case SIGN_IN:
            return {...state, isSignedIn:true, userId:action.payload.getId(), userName:action.payload.getGivenName(), userEmail:action.payload.getEmail()};
        case SIGN_OUT:
            return {...state, isSignedIn:false, userId:null, userName:null, userEmail:null};
        default: return state;
    };

};