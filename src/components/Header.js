import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './auth/Login';
import Logout from './auth/Logout';
import SearchBarForm from './SearchBarForm';
import './header.scss';

const Header = ({ isSignedIn, userName }) => {

    return (
        <div className="menu">
            <div className="home"> 
                <Link to='/' ><h1>RecipeStore</h1></Link>
            </div>
            <SearchBarForm/>
            <div className="loginComp">
                {isSignedIn? <Logout userName={userName} /> : <Login label='Login with Google' type='button' />}
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userName: state.auth.userName };
};

export default connect(mapStateToProps, null)(Header);