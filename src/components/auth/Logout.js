import React from 'react';
import { useGoogleAuth } from './useGoogleAuth';
import styled from 'styled-components';

const NameDiv = styled.div`
    font-weight: bold;
    font-size: larger;
`;

const Button = styled.button`
    border-radius: 5px;
    border: 1px solid;
    padding-top: 2px;
    padding-bottom: 2px;
    height: 30px;
    font-size: medium;
    width: auto;
`;

const Logout = ({ userName }) => {

    const auth = useGoogleAuth();

    const signOutClick = () => {
        auth.signOut();
    };  


    return (
        <div>
            <NameDiv> Hi {userName.charAt(0).toUpperCase() + userName.slice(1) }</NameDiv>
            <div><Button onClick={ signOutClick }>LogOut</Button></div>
        </div>
    );

};

export default Logout;