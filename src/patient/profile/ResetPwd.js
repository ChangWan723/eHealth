import React, { useState } from 'react';
import { Container, Typography, Box, Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;

const ResetPwd = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    });
    const [showError, setShowError] = useState(false);
    const [passwordError, setPasswordError] = useState('');

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
            setShowError(true); // Show error if passwords do not match
            return;
        }

        // Proceed with the password reset logic here
        console.log('Password reset logic goes here.');
        // Optionally, reset form state here
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
        </Container>
    );
};

export default ResetPwd;
