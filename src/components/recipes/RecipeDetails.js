import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../../actions/index'; 
import RecipeReviews from './RecipeReviews';
import Spinner from '../Spinner';
import Error from '../Error';
import './RecipeDetails.scss';


const RecipeDetail = (props) => {
    
    useEffect(() => { props.fetchRecipe(props.match.params.id) }, [props.match.params.id]);

    if(props.selectedRecipe && props.selectedRecipe.sourceName) {
        return(
            <div className="recipe-details-container">
                <div className="recipe-info-container">
                    <div className="recipe-info-item">
                        <img src={props.baseImageUri? props.baseImageUri+props.selectedRecipe.image : props.selectedRecipe.image} alt="recipe"/>
                    </div>
                    <div className="recipe-info-item"> 
                        <div>
                            <h2>{props.selectedRecipe.title}</h2>
                            <p>By:{props.selectedRecipe.sourceName} | ReadyInMin:{props.selectedRecipe.readyInMinutes} | Servings:{props.selectedRecipe.servings}</p>
                        </div>
                        <div>
                            <h4> {props.selectedRecipe.sourceName} Likes : {props.selectedRecipe.aggregateLikes}</h4>
                        </div>
                        <br/><br/>
                        <div>
                            <a href={props.selectedRecipe.sourceUrl} target="_blank"> View Process</a>
                        </div>
                    </div>
                </div>
                <hr/>
                <RecipeReviews recipeId={props.selectedRecipe.id}/>
            </div>
        );
    }  
    return props.error.isAPIError? <Error message={props.error.errorMessage} /> : <Spinner />;

};

const mapStateToProps = (state, ownProps) => {
    
    return { selectedRecipe : state.recipes.recipeList? state.recipes.recipeList[ownProps.match.params.id]: {}, baseImageUri: state.recipes.baseImageUri, error: state.error };
};

export default connect(mapStateToProps,{ fetchRecipe })(RecipeDetail);