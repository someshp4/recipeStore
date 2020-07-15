import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const Div = styled.div`
    margin-top: 2%;
    margin-bottom: 2%;
`;

const Span = styled.span`
    cursor: pointer;
    margin: 1%;
    font-size: 4vw;
    color: ${props => props.liked? props.theme.likeColor : "grey" };
    @media (min-width: 900px) {
        font-size: 2vw;
    }
`;

const Like = ({likeObj, onClick}) => {
    
    const likedFromProps = likeObj?true:false;
    const [liked, setLiked] = useState(likedFromProps);

    if(likedFromProps !== liked) {
        setLiked(likedFromProps);
    }

    const like = () => {
        onClick(likeObj? likeObj.id : 0);
    }


    return (
        <Div>
            <Span onClick={like} liked={liked}><FontAwesomeIcon icon={ faThumbsUp }  size="lg"/></Span>
        </Div>
    );

};

export default Like;