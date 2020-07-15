import React from 'react';
import styled from 'styled-components';


const Span = styled.span`
    color: ${({ theme }) => theme.errorColor};
`;

const Error = ({ message }) => {

    return(
        <div><Span>{ message }</Span></div>
    );
};

export default Error;