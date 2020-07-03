import { FETCH_RECIPE_LIKES, SAVE_RECIPE_LIKE, DELETE_RECIPE_LIKE } from '../actions/types';


export default (state = {}, action) => {
    
    switch(action.type) {
        case FETCH_RECIPE_LIKES: 
            if(action.payload[0]) {
                const obj = {...state};
                const recipeLikesObj = {};
                action.payload.forEach(element => recipeLikesObj[element.userId] = element);
                obj[action.payload[0].recipeId] = recipeLikesObj;
                return obj;
            }            
            return state;

        case SAVE_RECIPE_LIKE:
            const saveObj = {...state};
            if(!saveObj[action.payload.recipeId]) {
                saveObj[action.payload.recipeId]= {};
            }
            saveObj[action.payload.recipeId][action.payload.userId] = action.payload;
            return saveObj;

        case DELETE_RECIPE_LIKE:
            const delObj = {};
            delete state[action.payload.recipeId][action.payload.userId];
            Object.values(state).forEach(element => {
                if(Object.values(element)[0]) {
                    delObj[Object.values(element)[0].recipeId] = element;
                }
            });
            return delObj;

        default:
            return state;
    }
};