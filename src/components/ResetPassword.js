import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Container} from '@mui/material';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [error, setError] = useState('');
    const [reError, setReError] = useState('');
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)); // Basic email validation
    };

    const handleSendCode = () => {
        // Example API call for sending code
        fetch('/users/sendcode', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!passwordRegex.test(String(password))) {
            setError('・The password must contain at least 8 characters\n' +
                '・The password must contain 1 uppercase letter\n' +
                '・The password must contain 1 lowercase letter\n' +
                '・The password must contain 1 number\n' +
                '・If you want to use special characters, use . _ #\n' );
            return;
        }
        setError('');

        if (String(rePassword) !== String(password)) {
            setReError('Repeat Password must match Password.');
            return;
        }
        setReError('');

        console.log('Code:', code, 'New Password:', password, 'Email:', email);
    };

    const canSubmit = code.trim() !== '' && password.trim() && rePassword.trim() && isEmailValid;

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <TextField
                        inputProps={{maxLength: 50}}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                        onClick={handleSendCode}
                        disabled={!isEmailValid}
                    >
                        Send Verification Code
                    </Button>
                    <TextField
                        inputProps={{maxLength: 50}}
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Verification Code"
                        id="code"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                    />
                    <TextField
                        inputProps={{maxLength: 50}}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        helperText={error}
                        error={!!error}
                        sx={{ whiteSpace: 'pre-wrap' }}
                    />
                    <TextField
                        inputProps={{maxLength: 50}}
                        margin="normal"
                        required
                        fullWidth
                        name="repassword"
                        label="Repeat Password"
                        type="password"
                        id="repassword"
                        onChange={(e) => setRePassword(e.target.value)}
                        value={rePassword}
                        helperText={reError}
                        error={!!reError}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!canSubmit}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;
