import React, {useState} from 'react';
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
import RegisterValidation from "../../components/RegisterValidation";
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
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopUp = Boolean(anchorEl);
    const id = openPopUp ? 'simple-popover' : undefined;
    const [openProgress, setProgress] = useState(false);
    const [openFailDialog, setFailDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [accountErrors, setAccountErrors] = useState('');
    const [apiError, setApiError] = useState('');

    // State for form fields that can be edited
    const [accountInfo, setAccountInfo] = useState({
        patientId: '123456789',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        postcode: 'SO15 1DP',
        address: 'Mayflower Halls of Residence, West Park Road',
        birthday: 'Fri Mar 22 2001',
        gender: 'Female',
    });

    const errorApiMessages = new Map([
        ['serviceUnavailable', 'Service is currently unavailable. Please try again later.'],
        ['InputsError', 'Some of the information you input may be out of specification.'],
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


    // Handle changes in the editable form fields
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setAccountInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBirthday = (newBirthday) => {
        setAccountInfo(prevState => ({
            ...prevState,
            birthday: newBirthday
        }));
    }

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setAccountInfo(prevState => ({
            ...prevState,
            [name]: checked ? 'yes' : 'no',
        }));
    };

    const handleUpdate = () => {
        setProgress(true);

        const stringValues = Object.fromEntries(
            Object.entries(accountInfo).map(([key, value]) => [key, String(value)])
        );

        const url = process.env.REACT_APP_API_PATH + "/users/info";
        fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(stringValues)
        }).then(response => {
            setProgress(false);
            if (response.status === 201) {
                setSuccessDialog(true);
                return;
            }
            if (response.status === 400) {
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
        let errorMessage = RegisterValidation(accountInfo);

        if (!String(errorMessage).trim()) {
            handleUpdate();
        } else {
            setAccountErrors(errorMessage);
            setAnchorEl(event.currentTarget);
        }
    }

    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Account Information
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Patient ID"
                        value={accountInfo.patientId}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="postcode"
                        label="Postcode"
                        name="postcode"
                        value={accountInfo.postcode}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        value={accountInfo.address}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="gender-select-label">Gender *</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            label="Gender"
                            name="gender"
                            value={accountInfo.gender}
                            onChange={handleInputChange}
                        >
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                            <MenuItem value='Not specified'>Not specified</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                        <DatePicker
                            label="Birthday *"
                            renderInput={(params) => <TextField {...params} />}
                            defaultValue={new Date(accountInfo.birthday)}
                            onChange={(newValue) => handleBirthday(newValue.toDateString())}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{mt: 3, mb: 2}}
                onClick={handleSubmit}
            >
                Update
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
                        {"   Update Information Failed!"}
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
                        {"   Update Information Successfully!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Account Information has been successfully updated!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuccessDialogClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Container>
    );
};

export default Account;
