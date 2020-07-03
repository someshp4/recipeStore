import { API_ERROR, SERVER_ERROR } from '../actions/types';

const INITIAL_STATE = {
    isAPIError : false,
    isServerError : false,
    errorMessage : null
};


export default (state =INITIAL_STATE, action) => {

    switch(action.type) {
        case API_ERROR:
            return {...state, isAPIError:true, isServerError:false, errorMessage:action.payload };
        case SERVER_ERROR:
                return {...state, isAPIError:false, isServerError:true, errorMessage:action.payload };
        default: return state;
    };

};