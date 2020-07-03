import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import SearchBarForm from './SearchBarForm';
import './header.scss';

const Header = () => {

    return (
        <div className="menu">
            <div className="home"> 
                <Link to='/' ><h1>RecipeStore</h1></Link>
            </div>
            <SearchBarForm/>
            <div className="loginComp"><GoogleAuth /></div>
        </div>
    );

};

export default Header;