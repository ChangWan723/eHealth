import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {enGB} from "date-fns/locale/en-GB";
import RegisterValidation from './RegisterValidation'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import {red} from "@mui/material/colors";
import CircularProgress from '@mui/material/CircularProgress';
import Copyright from "./shared/Copyright";
import {
    IconHeartbeat
} from '@tabler/icons-react';
export const Register = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopUp = Boolean(anchorEl);
    const id = openPopUp ? 'simple-popover' : undefined;
    const [openProgress, setProgress] = useState(false);
    const [openFailDialog, setFailDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [accountErrors, setAccountErrors] = useState('');
    const [apiError, setApiError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        postcode: '',
        address: '',
        birthday: '',
        gender: '',
        password: '',
        repassword: ''
    });

    const checkFormValidity = () => {
        const { firstName, lastName, email, password, birthday, address, gender, postcode, repassword } = values;
        return firstName && lastName && email && password && birthday && address && gender && postcode && repassword;
    };

    React.useEffect(() => {
        setIsFormValid(checkFormValidity());
    }, [values]);

    const errorApiMessages = new Map([
        ['serviceUnavailable', 'Service is currently unavailable. Please try again later.'],
        ['InputsError', 'Some of the information you input may be out of specification.'],
        ['accountExists', 'Account already exists. Please login directly.'],
        ['unknownError', 'An unknown error occurred. ']
    ]);

    const handleFailDialogClose = () => {
        setFailDialog(false);
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialog(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({...prev, [name]: value}));
    }

    const handleBirthday = (newBirthday) => {
        setValues(prevState => ({
            ...prevState,
            birthday: newBirthday
        }));
    }

    const handleRegister = () => {
        setProgress(true);

        const {repassword, ...filteredValues} = values;
        const stringValues = Object.fromEntries(
            Object.entries(filteredValues).map(([key, value]) => [key, String(value)])
        );

        const url = process.env.REACT_APP_API_PATH + "/users/signup";
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(stringValues)
        }).then(response => {
            setProgress(false);
            if (response.status === 201) {
                setSuccessDialog(true);
                return;
            }
            if (response.status === 409) {
                setApiError(errorApiMessages.get('accountExists'));
            } else if (response.status === 400) {
                response.json().then(data => {
                    setApiError(errorApiMessages.get('InputsError') + '\n\n' + data.message);
                }).catch(error => {
                    setApiError(errorApiMessages.get('InputsError'));
                });
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
        let errorMessage = RegisterValidation(values);

        if (!String(errorMessage).trim()) {
            handleRegister();
        } else {
            setAccountErrors(errorMessage);
            setAnchorEl(event.currentTarget);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <IconHeartbeat/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Your Patient Access Account
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="postcode"
                                label="Postcode"
                                name="postcode"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                                <DatePicker
                                    label="Birthday *"
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(newValue) => handleBirthday(newValue.toDateString())}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl sx={{minWidth: 155}}>
                                <InputLabel id="gender-select-label">Gender *</InputLabel>
                                <Select
                                    labelId="gender-select-label"
                                    id="gender-select"
                                    label="Gender"
                                    name="gender"
                                    onChange={handleInput}
                                >
                                    <MenuItem value="">
                                    </MenuItem>
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                    <MenuItem value='Not specified'>Not specified</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="repassword"
                                label="Repeat Password"
                                type="password"
                                id="password"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!isFormValid}
                    >
                        Sign Up
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
                                {"   Sign Up Failed!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description" style={{whiteSpace: 'pre-wrap'}}>
                                    {apiError}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleFailDialogClose}>OK</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={openSuccessDialog}
                            onClose={handleSuccessDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                <DoneAllIcon color="success"/>
                                {"   Sign Up Successfully!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    This account has been successfully registered, you can sign in now!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button href="/auth/login">Sign in</Button>
                                <Button onClick={handleSuccessDialogClose}>OK</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}