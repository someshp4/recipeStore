import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.scss';


const RecipeCard = (props) => {
    return (
        <div className="card">
            <Link to={`/recipes/${props.id}`}>
                <img src ={props.imageUri} alt="recipe"/>
                <h2>{props.title}</h2>
            </Link>
            
        </div>
    );

};

export default RecipeCard;