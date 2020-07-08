import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecipeReviews, saveRecipeReview, updateRecipeReview, fetchRecipeLikes, saveRecipeLike, deleteRecipeLike } from '../../actions';
import ReviewFrom from './ReviewForm';
import Like from './Like';
import Error from '../Error';
import './RecipeDetails.scss';
import Spinner from '../Spinner';

const RecipeReviews = (props) => {

    useEffect(() => { 
        props.fetchRecipeReviews(props.recipeId); 
        props.fetchRecipeLikes(props.recipeId);
    }, [ props.recipeId ]);

    const onSubmit = (formValues) => {
        if(props.review && props.review[props.userId]) {
            props.updateRecipeReview(props.recipeId, formValues);
        } else  {
            props.saveRecipeReview(props.recipeId, formValues);
        }
    };

    const onClick = (id) => {
        if(id) {
            props.deleteRecipeLike(props.recipeId, id);
        } else {
            props.saveRecipeLike(props.recipeId);
        }
    };
    
    const likeObj = () => {
        return (props.like && props.like[props.userId]) ? props.like[props.userId] : null; 
    }
    
    if(!props.error.isServerError) {
        return(
            <div>
                <div>
                    <h3>Reviews({props.review? Object.keys(props.review).length : 0}) | Likes : {props.like? Object.keys(props.like).length : 0}</h3>
                    { !props.isSignedIn && <h4>Please Login to Like (or) Add a Review</h4>}
                    { props.isSignedIn && <Like onClick={onClick} likeObj={likeObj()}/> }
                    { props.isSignedIn && <ReviewFrom onSubmit={onSubmit} /> }
                </div>

                {props.review && <div className="reviews-info-container">
                    {Object.values(props.review).map(result => { 
                        return (
                        <div className="review-info-item" key={result.userId}>
                            <h4>{result.userName}</h4>
                            <h6>On {result.createdOn}</h6>
                            <p>{result.review}</p>
                        </div>
                        ); 
                    }

                    )}
                </div>}
            </div>
        );
    }
    return props.error.isServerError ? <Error message={props.error.errorMessage}/> : <Spinner />;
};

const mapStateToProps = (state, ownProps) => {
    return { review :  state.reviews[ownProps.recipeId], like : state.likes[ownProps.recipeId], isSignedIn: state.auth.isSignedIn, userId: state.auth.userId, error: state.error };
};

export default connect(mapStateToProps, { fetchRecipeReviews, saveRecipeReview, updateRecipeReview, fetchRecipeLikes, saveRecipeLike, deleteRecipeLike } )(RecipeReviews);