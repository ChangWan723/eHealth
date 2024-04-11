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
import {FormControl, InputLabel, MenuItem, Select,} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {enGB} from "date-fns/locale/en-GB";
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
import {IconHeartbeat} from '@tabler/icons-react';

export const Register = () => {
    const [openProgress, setProgress] = useState(false);
    const [openFailDialog, setFailDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [accountErrors, setAccountErrors] = useState('');
    const [apiError, setApiError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const [errors, setErrors] = useState({
        email: '',
        postcode: '',
        password: '',
        repassword: ''
    });

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

    function validation() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;
        const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]? [0-9][A-Z]{2}$/i;

        let isValid = true;

        if (!emailRegex.test(String(values.email))) {
            setErrors(prev => ({...prev, email: 'Invalid email format.'}));
            isValid = false;
        } else {
            setErrors(prev => ({...prev, email: ''}));
        }

        if (!postcodeRegex.test(String(values.postcode))) {
            setErrors(prev => ({...prev, postcode: 'Invalid postcode format.'}));
            isValid = false;
        } else {
            setErrors(prev => ({...prev, postcode: ''}));
        }

        if (!passwordRegex.test(String(values.password))) {
            setErrors(prev => ({
                ...prev, password: '・The password must contain at least 8 characters\n' +
                    '・The password must contain 1 uppercase letter\n' +
                    '・The password must contain 1 lowercase letter\n' +
                    '・The password must contain 1 number\n' +
                    '・If you want to use special characters, use . _ #\n'
            }));
            isValid = false;
        } else {
            setErrors(prev => ({...prev, password: ''}));
        }

        if (String(values.repassword) !== String(values.password)) {
            setErrors(prev => ({...prev, repassword: 'Repeat Password must match Password.'}));
            isValid = false;
        } else {
            setErrors(prev => ({...prev, repassword: ''}));
        }
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validation()) {
            console.log('Form is valid, submitting:', values);
        } else {
            console.log('Form is invalid, fix errors:', errors);
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
                                inputProps={{ maxLength: 50 }}
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
                                inputProps={{ maxLength: 50 }}
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
                                inputProps={{ maxLength: 50 }}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleInput}
                                helperText={errors.email}
                                error={!!errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{ maxLength: 50 }}
                                required
                                fullWidth
                                id="postcode"
                                label="Postcode"
                                name="postcode"
                                onChange={handleInput}
                                helperText={errors.postcode}
                                error={!!errors.postcode}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{ maxLength: 300 }}
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
                                    maxDate={new Date()}
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
                                helperText={errors.password}
                                error={!!errors.password}
                                sx={{ whiteSpace: 'pre-wrap' }}
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
                                helperText={errors.repassword}
                                error={!!errors.repassword}
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