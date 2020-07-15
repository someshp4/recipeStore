import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import Login from './auth/Login';
import Logout from './auth/Logout';
import SearchBarForm from './SearchBarForm';
import './header.scss';
import Toggler from './mode/Toggler';
import styled from 'styled-components';

const StyledMenuDiv = styled.div`
    @media (min-width: 800px) {
        background-color:  ${({ theme }) => theme.headerColor};
    }

    div, form {
        color: ${({ theme }) => theme.text};
        background-color:  ${({ theme }) => theme.headerColor};

        input, select, button {
            color: ${({ theme }) => theme.text};
            background-color:  ${({ theme }) => theme.buttonBackground};
            border-color: ${({ theme }) => theme.buttonBorder};
        }
    }

    h1 {
        color: ${({ theme }) => theme.homeButtonColor};
    }
`;

const Header = ({ theme, themeToggler, isSignedIn, userName }) => {

    return (
        <StyledMenuDiv className="menu">
            <div className="home"> 
                <Link to='/' ><h1>RecipeStore</h1></Link>
            </div>
            <SearchBarForm/>
            <div className="loginComp">
                {isSignedIn? <Logout userName={userName} /> : <Login label='Login with Google' type='button' />}
            </div>
            <div className="themeComp">
                <Toggler theme={theme} themeToggler={themeToggler} />
            </div>
        </StyledMenuDiv>
    );

};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userName: state.auth.userName };
};

Header.propTypes = {
    theme: string.isRequired,
    themeToggler: func.isRequired,
}

export default connect(mapStateToProps, null)(Header);