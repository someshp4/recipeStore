import { FETCH_RECIPE_REVIEWS, SAVE_RECIPE_REVIEW, UPDATE_RECIPE_REVIEW } from '../actions/types';


export default (state = {}, action) => {
    
    switch(action.type) {
        case FETCH_RECIPE_REVIEWS: 
            if(action.payload[0]) {
                const obj = {...state};
                const recipeReviewsObj = {};
                action.payload.forEach(element => recipeReviewsObj[element.userId] = element);
                obj[action.payload[0].recipeId] = recipeReviewsObj;
                return obj;
            }
            return state;

        case SAVE_RECIPE_REVIEW: 
            const saveObj = {...state};
            if(!saveObj[action.payload.recipeId]) {
                saveObj[action.payload.recipeId]= {};
            }
            saveObj[action.payload.recipeId][action.payload.userId] = action.payload;
            return saveObj;

        case UPDATE_RECIPE_REVIEW:
            const updatedObj = { ...state };
            const reviews = { ...updatedObj[action.payload.recipeId], [action.payload.userId]: action.payload};
            updatedObj[action.payload.recipeId] = reviews;
            return updatedObj;

        default: return state;
    }
};