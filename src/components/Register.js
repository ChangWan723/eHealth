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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {FormControl, InputLabel, MenuItem, Popover, Popper, Select} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {enGB} from "date-fns/locale/en-GB";
import RegisterValidation from './RegisterValidation'


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

export const Register = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [errors, setErrors] = useState('')
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        postcode: '',
        birthday: '',
        gender: '',
        password: '',
        repassword:''
    });

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleBirthday = (newBirthday) => {
        setValues(prevState => ({
            ...prevState,
            birthday: newBirthday
        }));
    }

    const handleRegister = () => {
        const { repassword, ...filteredValues } = values;
        const stringValues = Object.fromEntries(
            Object.entries(filteredValues).map(([key, value]) => [key, String(value)])
        );

        fetch("https://127.0.0.1:9090/user/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(stringValues)
        }).then(() => {
            console.log("New User Register")
        }).catch(error => {
            console.log(JSON.stringify(stringValues));  // TODO
            console.error("Failed to register new user:", error);
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        let errorMessage;
        errorMessage = RegisterValidation(values);

        if (!String(errorMessage).trim()) {
            handleRegister();
        } else {
            setErrors(RegisterValidation(values))
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
                    <LockOutlinedIcon/>
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
                        <Grid item xs={12} sm={7}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                                <DatePicker
                                    label="Birthday"
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(newValue) => handleBirthday(newValue.toDateString())}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl sx={{minWidth: 155}}>
                                <InputLabel id="gender-select-label">Gender</InputLabel>
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
                    >
                        Sign Up
                    </Button>
                    <Popover
                        id={id}
                        open={open}
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
                            {errors}
                        </div>
                    </Popover>
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