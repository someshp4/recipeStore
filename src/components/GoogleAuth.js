import React, { useState, useEffect } from  'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';
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

const Avatar = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const GoogleAuth =  ({ isSignedIn, userName, signIn, signOut }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const params = {
          clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          scope: "email",
        };
    
        window.gapi.load("client:auth2", () => {
          window.gapi.client.init(params).then(() => {
            setAuth(window.gapi.auth2.getAuthInstance());
            onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
          });
        });
      }, []);

    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile());
        } else {
            signOut();
        }
    };

    const signInClick = () => {
        auth.signIn({prompt: 'select_account'});
    };

    const signOutClick = () => {
        auth.signOut();
    };


    if(isSignedIn) {
        const profilePic = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
        return (
            <div>
                <NameDiv>{profilePic? <Avatar src={profilePic} alt="Avatar"/> : ''} Hi {userName.charAt(0).toUpperCase() + userName.slice(1)}</NameDiv>
                <div><Button onClick={ signOutClick }>LogOut</Button></div>
            </div>
        );
    } else {
        return(
            <div>
                <Button onClick={ signInClick }>Login with Google</Button>
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userName: state.auth.userName };
};

export default connect( mapStateToProps, { signIn, signOut })(GoogleAuth);