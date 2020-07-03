import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { fetchRecipes } from '../../actions';
import Spinner from '../Spinner';
import Error from '../Error';
import './RecipeList.scss';


const RecipeList = ({ defaultRecipies, fetchRecipes, error }) => {

    const location = useLocation();
    const paramsObject = new URLSearchParams(location.search);
    const mealType = paramsObject.get('mealType');
    const searchTerm = paramsObject.get('searchTerm');

    useEffect(() => { fetchRecipes(mealType, searchTerm) }, [ mealType, searchTerm ]);

    if (defaultRecipies.recipeList) {
        const baseImageUri = defaultRecipies.baseImageUri? defaultRecipies.baseImageUri : '';
        return (
            <div className="cards">
                {Object.values(defaultRecipies.recipeList).map(result => <RecipeCard key={result.id} id={result.id} title={result.title} imageUri={baseImageUri + result.image} />)}
            </div>
        );
    }
    return error.isAPIError? <Error message={error.errorMessage} /> : <Spinner />;
};

const mapStateToProps = (state) => {
    return { defaultRecipies: state.recipes, error: state.error };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipeList);