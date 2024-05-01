import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
import {red} from "@mui/material/colors";
import CircularProgress from '@mui/material/CircularProgress';
import Copyright from "./shared/Copyright";
import {
    IconHeartbeat
} from '@tabler/icons-react';

const Login = () => {
    const navigate = useNavigate();
    const [openProgress, setProgress] = useState(false);
    const [openFailDialog, setFailDialog] = useState(false);
    const [accountErrors, setAccountErrors] = useState('');
    const [apiError, setApiError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const errorApiMessages = new Map([
        ['serviceUnavailable', 'Service is currently unavailable. Please try again later.'],
        ['infoIncorrect', 'Incorrect account or password. Or the account is pending approval.'],
        ['unknownError', 'An unknown error occurred. Please contact the administrator.']
    ]);

    const checkFormValidity = () => {
        const { email, password} = values;
        return email && password;
    };

    React.useEffect(() => {
        setIsFormValid(checkFormValidity());
    }, [values]);
    const handleFailDialogClose = () => {
        setFailDialog(false);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({...prev, [name]: value}));
    }

    const handleLogin = () => {
        setProgress(true);

        console.log(values);

        const stringValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, String(value)])
        );

        const url = process.env.REACT_APP_API_PATH + "/users/signin";
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(stringValues)
        }).then(response => {
            setProgress(false);
            if (response.status === 200) {
                response.json().then(data => {
                    let userType = data.userType;
                    let token = data.token;
                    let name = data.userName;
                    let id = data.id;
                    if (userType === 'Patient') {
                        localStorage.setItem('patientEmail', values.email);
                        localStorage.setItem('userType', 'patient');
                        localStorage.setItem('patientId', id);
                        localStorage.setItem('patientName', name);
                        localStorage.setItem('token', token);
                        navigate('/patient');
                    } else if (userType === 'Doctor') {
                        localStorage.setItem('doctorEmail', values.email);
                        localStorage.setItem('userType', 'doctor');
                        localStorage.setItem('doctorId', id);
                        localStorage.setItem('doctorName', name);
                        localStorage.setItem('token', token);
                        navigate('/doctor');
                    } else if (userType === 'Admin') {
                        localStorage.setItem('adminEmail', values.email);
                        localStorage.setItem('userType', 'admin');
                        localStorage.setItem('adminId', id);
                        localStorage.setItem('adminName', name);
                        localStorage.setItem('token', token);
                        navigate('/admin');
                    }
                });
            } else if (response.status === 401) {
                setApiError(errorApiMessages.get('infoIncorrect'));
            } else {
                setApiError(errorApiMessages.get('unknownError'));
            }
            setFailDialog(true);
        }).catch(() => {
            setProgress(false);
            setApiError(errorApiMessages.get('serviceUnavailable'));
            setFailDialog(true);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
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
                        <IconHeartbeat/>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={!isFormValid}
                        >
                            Sign In
                        </Button>
                        <React.Fragment>
                            <Dialog open={openProgress}>
                                <div style={{
                                    height: "60px",
                                    width: "60px",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <CircularProgress/>
                                </div>
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
                                <Link href="/reset" variant="body2">
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
        </Container>
    );
}

export default Login;