import React, {FC} from 'react';
import {AppBar, Avatar, Toolbar, Button} from "@material-ui/core";
import {GoogleLogout} from 'react-google-login';

import classes from './Header.module.scss';

const Header: FC = () => {
    const imgSrc= localStorage.getItem('userImg') as string;
    const userName = localStorage.getItem('userName') as string;

    const logout = () => {
        localStorage.clear();
        window.dispatchEvent( new Event('storage') );
    };

    return (
        <AppBar position="static" color='secondary'>
            <Toolbar className={classes.toolbar}>
                <div className={classes.userInfo}>
                    <Avatar alt="user avatar" src={imgSrc} />
                    <div>
                        {userName}
                    </div>
                </div>
                <GoogleLogout
                    clientId="364643492164-lj63hjopspt4epse5ldmjq4t7fjgku6e.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            Log out
                        </Button>
                    )}
                    onLogoutSuccess={logout}
                >
                </GoogleLogout>
            </Toolbar>
        </AppBar>
    );
};

export default Header;