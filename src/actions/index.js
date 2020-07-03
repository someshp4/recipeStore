import recipes from '../apis/recipes';
import dataStore from '../apis/dataStore';
import { API_ERROR, SERVER_ERROR, SIGN_IN, SIGN_OUT, FETCH_RECIPES, FETCH_RECIPE_INFO, FETCH_RECIPE_REVIEWS, SAVE_RECIPE_REVIEW, UPDATE_RECIPE_REVIEW, FETCH_RECIPE_LIKES, SAVE_RECIPE_LIKE, DELETE_RECIPE_LIKE } from './types';

export const signIn = (userProfile) => {
    return {
        type: SIGN_IN,
        payload: userProfile
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const fetchRecipes = (mealType, searchTerm) => async (dispatch) => {
    let queryParams = {};
    if(mealType && mealType!=='any') {
        queryParams['type']=mealType;
    }
    if(searchTerm) {
        queryParams['query'] = searchTerm;
    }

    try {
        queryParams['number'] = 15;
        const response = await recipes.get('/recipes/search', {
            params: queryParams
        });
        dispatch({
            type : FETCH_RECIPES,
            payload : response.data
        });
    } catch (e) {
        console.log("fetchRecipes", e);
        dispatch({
            type : API_ERROR,
            payload : "Failed to load"
        });
    }

};

export const fetchRecipe = (id) => async (dispatch) => {
    try {
        const response = await recipes.get(`/recipes/${id}/information?includeNutrition=false`);

        dispatch({
            type : FETCH_RECIPE_INFO,
            payload : response.data
        });
    } catch(e) {
        console.log("fetchRecipe", e);
        dispatch({
            type : API_ERROR,
            payload : "Failed to load"
        });
    }

};

export const fetchRecipeReviews = (recipeId) => async (dispatch) => {
    try {
        const response = await dataStore.get(`/reviews?recipeId=${recipeId}`);

        dispatch({
            type : FETCH_RECIPE_REVIEWS,
            payload : response.data
        });
    } catch(e) {
        console.log("fetchRecipeReviews", e);
        dispatch({
            type : SERVER_ERROR,
            payload : "Failed to load"
        });
    }
    
};

export const saveRecipeReview = (recipeId, formValues) => async (dispatch, getState) => {
    
    try {
        const obj = {};
        obj.recipeId = recipeId;
        obj.userId = getState().auth.userId;
        obj.userName = getState().auth.userName;
        obj.createdOn = new Date().toLocaleDateString();
        obj.review = formValues.review;
        const response = await dataStore.post(`/reviews`, obj);

        dispatch({
            type : SAVE_RECIPE_REVIEW,
            payload : response.data
        });
    } catch(e) {
        console.log("saveRecipeReview", e);
        dispatch({
            type : SERVER_ERROR,
            payload : "Failed to load"
        });
    }
};

export const updateRecipeReview = (recipeId, formValues) => async (dispatch, getState) => {
    try {
        const obj = getState().reviews[recipeId][getState().auth.userId];
        obj.userName = getState().auth.userName;
        obj.createdOn = new Date().toLocaleDateString();
        obj.review = formValues.review;
        const response = await dataStore.patch(`/reviews/${obj.id}`, obj);

        dispatch({
            type : UPDATE_RECIPE_REVIEW,
            payload : response.data
        });
    } catch(e) {
        console.log("updateRecipeReview", e);
        dispatch({
            type : SERVER_ERROR,
            payload : "Failed to load"
        });
    }
    
};


export const fetchRecipeLikes = (recipeId) => async (dispatch) => {
    try {
        const response = await dataStore.get(`/likes?recipeId=${recipeId}`);

        dispatch({
            type : FETCH_RECIPE_LIKES,
            payload : response.data
        });
    } catch(e) {
        console.log("fetchRecipeLikes", e);
        dispatch({
            type : SERVER_ERROR,
            payload : "Failed to load"
        });
    }
    
};

export const saveRecipeLike = (recipeId) => async (dispatch, getState) => {
    try {
        const obj = {};
        obj.recipeId = recipeId;
        obj.userId = getState().auth.userId;
        const response = await dataStore.post(`/likes`, obj);

        dispatch({
            type : SAVE_RECIPE_LIKE,
            payload : response.data
        });
    } catch(e) {
        console.log("saveRecipeLike", e);
        dispatch({
            type : SERVER_ERROR,
            payload : "Failed to load"
        });
    }
    
};

export const deleteRecipeLike = (recipeId, id) => async (dispatch, getState) => {
    try {
        await dataStore.delete(`/likes/${id}`);
        const obj = {};
        obj.recipeId = recipeId;
        obj.userId = getState().auth.userId;

        dispatch({
            type : DELETE_RECIPE_LIKE,
            payload : obj
        });
    } catch(e) {
        console.log("deleteRecipeLike", e);
        dispatch({
            type : SERVER_ERROR,
            payload : "Failed to load"
        });
    }
    
};
