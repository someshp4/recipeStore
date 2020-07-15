import React from 'react';
import { func, string } from 'prop-types';
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Span = styled.span`
    cursor: pointer;
    margin: 1%;
    font-size: 4vw;
    color: ${props => props.theme === 'light'? "black" : "yellow" };
    @media (min-width: 900px) {
        font-size: 2vw;
    }
`;

const Toggler = ({ theme, themeToggler }) => {

    return (
        <Span onClick={ themeToggler } theme={ theme }>
            <FontAwesomeIcon icon={ theme === 'light' ? faMoon : faSun }  size="sm"/>
        </Span>
    );
};

Toggler.propTypes = {
    theme: string.isRequired,
    themeToggler: func.isRequired,
}

export default Toggler;
