import { FETCH_RECIPES, FETCH_RECIPE_INFO} from '../actions/types';

export default (state = {}, action) => {
    
    if(action.type === FETCH_RECIPES) {
        const recipesObj = {};
        action.payload.results.forEach(element => {
            recipesObj[element.id] = {...element};
        });
        const obj = {};
        obj.recipeList = recipesObj;
        obj.baseImageUri = action.payload.baseUri;
        return obj;
    } else if(action.type === FETCH_RECIPE_INFO) {
        const obj = {};
        obj.recipeList = {...state.recipeList, [action.payload.id]:action.payload};
        return obj;
    }
    return state;
};