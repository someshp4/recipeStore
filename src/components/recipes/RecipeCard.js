import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
    background-color: ${({ theme }) => theme.cardColor};

    h2 {
        color: ${({ theme }) => theme.text};
    }

    img {
        filter: ${({ theme }) => theme.imageFilter};
    }
`;


const RecipeCard = (props) => {
    return (
        <Card className="card">
            <Link to={`/recipes/${props.id}`}>
                <img src={props.imageUri} alt="recipe" />
                <h2>{props.title}</h2>
            </Link>
        </Card>
    );

};

export default RecipeCard;