import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextField,
    Typography
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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Account = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopUp = Boolean(anchorEl);
    const id = openPopUp ? 'simple-popover' : undefined;
    const [openProgress, setProgress] = useState(false);
    const [openFailDialog, setFailDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [openCancelDialog, setCancelDialog] = useState(false);
    const [deleteRegister, setDeleteRegister] = useState('');
    const [accountErrors, setAccountErrors] = useState('');
    const [apiError, setApiError] = useState('');

    const [accountInfo, setAccountInfo] = useState({
        patientId: '',
        firstName: '',
        lastName: '',
        email: '',
        postcode: '',
        address: '',
        birthday: '',
        gender: '',
    });

    const errorApiMessages = new Map([
        ['serviceUnavailable', 'Service is currently unavailable. Please try again later.'],
        ['InputsError', 'Some of the information you input may be out of specification.'],
        ['unknownError', 'An unknown error occurred. ']
    ]);



    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/patients/info?patientId=" + localStorage.getItem('patientId');

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.count > 0) {
                    const patient = data.patients[0];
                    setAccountInfo({
                        patientId: patient._id,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        email: patient.email,
                        postcode: patient.postcode,
                        address: patient.address,
                        birthday: patient.birthday,
                        gender: patient.gender,
                    });
                }
            })
            .catch(error => console.error('Error fetching patient info:', error));
    }, []);

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

    function handleCancel() {
        setCancelDialog(true);
    }

    function handleCancelDialogClose() {
        setCancelDialog(false);
    }

    function isFormValid() {
        return deleteRegister === 'delete';
    }

    function deleteAccount() {
        setDeleteRegister('');
        setCancelDialog(false);


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
                            maxDate={new Date()}
                            renderInput={(params) => <TextField {...params} />}
                            value={new Date(accountInfo.birthday)}
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
            <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{mt: 3, mb: 2}}
                onClick={handleCancel}
            >
                Cancel Registration
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
                <Dialog
                    open={openCancelDialog}
                    onClose={handleCancelDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <WarningAmberIcon color="error"/>
                        {"   Note: This is a Dangerous Operation!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action will delete your account. In accordance with GDPR principles, we will delete all information about you, so please proceed with caution.
                        </DialogContentText>

                        <br/>

                        <DialogContentText id="alert-dialog-description2">
                            If you are sure you want to delete your account and information, please enter "delete" below and click Confirm.
                        </DialogContentText>

                        <br/>

                        <DialogContentText id="alert-dialog-description2">
                            Note: The act is irrevocable!
                        </DialogContentText>

                        <br/>

                        <TextField
                            inputProps={{ maxLength: 50 }}
                            autoFocus
                            margin="normal"
                            id="description"
                            label="Cancel"
                            type="text"
                            fullWidth
                            onChange={(e) => setDeleteRegister(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteAccount} disabled={!isFormValid()}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Container>
    );
};

export default Account;
