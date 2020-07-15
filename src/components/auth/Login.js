import React from 'react';
import { useGoogleAuth } from './useGoogleAuth';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 5px;
    border: 1px solid;
    padding-top: 2px;
    padding-bottom: 2px;
    height: 30px;
    font-size: medium;
    width: auto;
`;

const LoginLink = styled.p`
    text-decoration: underline;
    color: ${({ theme }) => theme.homeButtonColor}; 
    cursor: pointer;
    font-style: italic;
`;

const Login = ({ label, type}) => {

    const auth = useGoogleAuth();

    const signInClick = () => {
        auth.signIn({prompt: 'select_account'});
    };

    if(type === 'link') {
        return (
            <LoginLink onClick={ signInClick } >{label}</LoginLink>
        );
    }
    return (
        <div>
            <Button onClick={ signInClick }>{label}</Button>
        </div>
    );

};

export default Login;