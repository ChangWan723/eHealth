import React, {useEffect, useState} from 'react';
import {
    Container,
    TextField,
    Typography,
    Button, FormControl, InputLabel, Select, MenuItem, Popover
} from '@mui/material';
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {enGB} from "date-fns/locale/en-GB";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import RegisterValidation from "../../components/shared/RegisterValidation";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorIcon from "@mui/icons-material/Error";
import {red} from "@mui/material/colors";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Account = () => {
    // State for form fields that can be edited
    const [accountInfo, setAccountInfo] = useState({
        doctorId: '',
        department: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/info?doctorId=" + localStorage.getItem('doctorId');

        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.count > 0) {
                    const doctor = data.doctors[0];
                    setAccountInfo({
                        doctorId: doctor._id,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        email: doctor.email,
                        department: doctor.department,
                    });
                }
            })
            .catch(error => console.error('Error fetching patient info:', error));
    }, []);

    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Account Information
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Doctor ID"
                        value={accountInfo.doctorId}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        label="Department"
                        value={accountInfo.department}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={accountInfo.firstName}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={accountInfo.lastName}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={accountInfo.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Account;
