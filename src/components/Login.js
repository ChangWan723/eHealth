import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Popover} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
import {red} from "@mui/material/colors";
import CircularProgress from '@mui/joy/CircularProgress';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.southampton.ac.uk/">
                University of Southampton
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const Login = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopUp = Boolean(anchorEl);
    const id = openPopUp ? 'simple-popover' : undefined;
    const [openProgress, setProgress] = useState(false);
    const [openFailDialog, setFailDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [accountErrors, setAccountErrors] = useState('');
    const [apiError, setApiError] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const errorApiMessages = new Map([
        ['serviceUnavailable', 'Service is currently unavailable. Please try again later.'],
        ['infoIncorrect', 'Incorrect account or password.'],
        ['unknownError', 'An unknown error occurred. Please contact the administrator.']
    ]);

    const handleFailDialogClose = () => {
        setFailDialog(false);
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialog(false);
    };

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        setProgress(true);

        const stringValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, String(value)])
        );

        const params = new URLSearchParams();
        params.append('email', values.email);
        params.append('password', values.password);
        const url = 'https://127.0.0.1:9090/user/signin?' + params.toString();

        fetch(url).then(() => {
            setProgress(false);
        }).catch(error => {
            setProgress(false);
            setApiError(errorApiMessages.get('serviceUnavailable'));
            setFailDialog(true);
            console.log(JSON.stringify(stringValues));  // TODO
        });
    }

    function validation() {
        let errorMessage = '';
        if (!(String(values.email).trim())) {
            errorMessage += '・Email is required.\n';
        }

        if (!(String(values.password).trim())) {
            errorMessage += '・Password is required.\n';
        }
        return errorMessage;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errorMessage = validation();

        if (!String(errorMessage).trim()) {
            handleLogin();
        } else {
            setAccountErrors(errorMessage);
            setAnchorEl(event.currentTarget);
        }
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleInput}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Popover
                            id={id}
                            open={openPopUp}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <div style={{
                                whiteSpace: 'pre-wrap',
                                border: '1px solid #ff0000',
                                backgroundColor: '#ffe6e6',
                                padding: '10px',
                                borderRadius: '5px',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '14px',
                                color: '#ff0000',
                            }}>
                                {accountErrors}
                            </div>
                        </Popover>
                        <React.Fragment>
                            <Dialog
                                style={{backgroundColor: 'transparent'}}
                                open={openProgress}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <CircularProgress/>
                            </Dialog>
                            <Dialog
                                open={openFailDialog}
                                onClose={handleFailDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    <ErrorIcon sx={{color: red[500]}}/>
                                    {"   Sign In Failed!"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {apiError}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleFailDialogClose}>OK</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{mt: 5}}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}