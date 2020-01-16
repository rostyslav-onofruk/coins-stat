import React, {FC, useEffect, useState} from 'react';
import {Button} from '@material-ui/core'
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {history} from '../../routes';

import imageSrc from '../../assets/images/google_logo.png';
import classes from './Login.scss';

interface Profile {
    getId: Function
    getName: Function
    getImageUrl: Function
}

const Login: FC  = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        if (userId) {
            history.push('/');
        }
    }, [userId]);

    const onSignIn = (googleUser: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        // @ts-ignore
        const profile: Profile = googleUser.getBasicProfile();
        const userId = profile.getId();

        localStorage.setItem('userName', profile.getName());
        localStorage.setItem('userImg', profile.getImageUrl());
        localStorage.setItem('userId', userId);
        window.dispatchEvent(new Event('storage'));

        setUserId(userId);
    };

    return (
        <div className={classes.content}>
            <div>
                Welcome Coins Stat App
            </div>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
                buttonText="Login"
                onSuccess={onSignIn}
                onFailure={onSignIn}
                redirectUri={'localhost:8000'}
                render={(renderProps) => (
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                        <span>Log in with Google</span>
                        <img src={imageSrc} alt="google logo" className={classes.logo}/>
                    </Button>)}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Login;