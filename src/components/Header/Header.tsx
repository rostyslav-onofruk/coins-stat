import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppBar, Avatar, Button, Snackbar, Toolbar} from '@material-ui/core';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {GoogleLogout} from 'react-google-login';
import {State} from '../../pages/Home/Home';
import classes from './Header.scss';

interface AlertData {
    severity: "success" | "error" | "info" | "warning" | undefined;
    text: string
}

const Header: FC = () => {
    const [open, setOpen] = useState(false);
    const [alertData, setAlertData] = useState<AlertData>({text: '', severity: undefined});
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const imgSrc = localStorage.getItem('userImg') as string;
    const userName = localStorage.getItem('userName') as string;
    const {coinsDetails} = useSelector((state: State) => state.coinsData.data);

    useEffect(() => {
        if (coinsDetails.length || !isFirstLoad) {
            setAlertData({text: 'Data successfully updated!', severity: 'success'});
            setOpen(true);
            setIsFirstLoad(false);
        }
    }, [coinsDetails, isFirstLoad]);

    useEffect(() => {
        // @ts-ignore
        document.body.onoffline = () => {
            setAlertData({text: 'Offline mode! No internet connection!', severity: 'error'});
            setOpen(true);
        };
    }, []);

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
                        {userName}
                    </div>
                    <GoogleLogout
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
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
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity={alertData.severity}>
                    {alertData.text}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Header;