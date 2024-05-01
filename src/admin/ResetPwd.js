import React, { useState } from 'react';
import { Container, Typography, Box, Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;

const ResetPwd = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    });
    const [showError, setShowError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [openProgress, setProgress] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswords(prevPasswords => ({
            ...prevPasswords,
            [name]: value,
        }));
        // Reset error states on edit
        setShowError(false);
        setPasswordError('');
    };

    const validatePassword = (password) => {
        return passwordRegex.test(password);
    };

    const handleSubmit = () => {
        if (!validatePassword(passwords.newPassword)) {
            setPasswordError('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number. You only can use the following special characters . _ #');
            return;
        }

        if (passwords.newPassword !== passwords.repeatNewPassword) {
            setShowError(true);
            return;
        }

        const body = {
            email: localStorage.getItem('adminEmail'),
            oldPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        };

        setProgress(true);
        const url = process.env.REACT_APP_API_PATH + "/users/resetPassword";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status === 201 || response.status === 401 || response.status === 404 || response.status === 500) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                if (data.message) {
                    setResponseMessage(data.message);
                } else if (data.error) {
                    setResponseMessage(data.error.message);
                }
                setProgress(false);
                setOpenDialog(true);
            })
            .catch(error => {
                setResponseMessage(error.message);
                setProgress(false);
                setOpenDialog(true);
            });
    };

    const isDisabled = !passwords.currentPassword || !passwords.newPassword || !passwords.repeatNewPassword || showError || passwordError;

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Reset Password
                </Typography>
                <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="current-password">Current Password</InputLabel>
                    <Input id="current-password" type="password" name="currentPassword" value={passwords.currentPassword} onChange={handleChange} />
                </FormControl>
                <FormControl variant="standard" fullWidth margin="normal" error={!!passwordError || (showError && passwords.newPassword !== passwords.repeatNewPassword)}>
                    <InputLabel htmlFor="new-password">New Password</InputLabel>
                    <Input id="new-password" type="password" name="newPassword" value={passwords.newPassword} onChange={handleChange} />
                    {(passwordError || (showError && passwords.newPassword !== passwords.repeatNewPassword)) && <FormHelperText>{passwordError || "Passwords do not match."}</FormHelperText>}
                </FormControl>
                <FormControl variant="standard" fullWidth margin="normal" error={showError && passwords.newPassword !== passwords.repeatNewPassword}>
                    <InputLabel htmlFor="repeat-new-password">Repeat New Password</InputLabel>
                    <Input id="repeat-new-password" type="password" name="repeatNewPassword" value={passwords.repeatNewPassword} onChange={handleChange} />
                    {showError && passwords.newPassword !== passwords.repeatNewPassword && <FormHelperText>Passwords do not match.</FormHelperText>}
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    sx={{ mt: 2 }}
                >
                    Reset Password
                </Button>
            </Box>
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Response"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {responseMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ResetPwd;
