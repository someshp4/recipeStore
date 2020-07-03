import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';
import reviewsReducer from './reviewsReducer';
import likesReducer from './likesReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    auth : authReducer,
    recipes : recipesReducer,
    reviews : reviewsReducer,
    likes : likesReducer,
    error : errorReducer,
    form : reducer
}); 