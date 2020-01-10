import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppBar, Avatar, Button, Toolbar, Snackbar} from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {GoogleLogout} from 'react-google-login';

import classes from './Header.scss';
import {State} from "../../pages/Home/Home";

const Header: FC = () => {
    const [open, setOpen] = useState(false);
    const imgSrc = localStorage.getItem('userImg') as string;
    const userName = localStorage.getItem('userName') as string;
    const {coinsDetails} = useSelector((state: State) => state.coinsData.data);

    useEffect(() => {
        if (coinsDetails.length) {
            setOpen(true);
        }
    }, [coinsDetails]);

    const logout = () => {
        localStorage.clear();
        window.dispatchEvent(new Event('storage'));
    };

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <AppBar position="static" color='secondary'>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.userInfo}>
                        <Avatar alt="user avatar" src={imgSrc}/>
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
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="success">
                    Data successfully loaded
                </Alert>
            </Snackbar>
        </>
    );
};

export default Header;