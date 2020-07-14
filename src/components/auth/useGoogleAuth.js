import { useState, useEffect } from  'react';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../../actions/index';


export const useGoogleAuth =  () => {

  const [auth, setAuth] = useState({});
  const dispatch =  useDispatch();
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
          dispatch(signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()));
      } else {
          dispatch(signOut());
      }
  };
  return auth;

};