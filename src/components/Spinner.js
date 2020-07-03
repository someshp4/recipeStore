import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Div = styled.div`
    margin: 20%;
    text-align: center;
`;

const Spinner = () => {

    return (
        <Div>
            <span>Loading... <FontAwesomeIcon icon={ faSpinner } pulse size="5x" color="lightblue"/></span>
        </Div>
    );
};

export default Spinner;