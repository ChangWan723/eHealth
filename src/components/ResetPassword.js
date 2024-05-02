import React, {useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {IconHeartbeat} from "@tabler/icons-react";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [error, setError] = useState('');
    const [reError, setReError] = useState('');
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [openProgress, setProgress] = useState(false);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)); // Basic email validation
    };

    const handleSendCode = () => {
        const userEmail={
            email: email,
        };

        const url = process.env.REACT_APP_API_PATH + "/users/sendVerificationCode";
        setProgress(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(userEmail)
        })
            .then(response => {
                if (response.status === 201 || response.status === 401 || response.status === 404 || response.status === 429) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                if (data.message) {
                    setDialogContent(data.message);
                }
                setProgress(false);
                setOpen(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setDialogContent('An error occurred while processing the request.');
                setProgress(false);
                setOpen(true);
            });
    };

    const handleClose = () => {
        setOpen(false);
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

        const body = {
            email: email,
            code: code,
            newPassword: password
        };

        setProgress(true);
        const url = process.env.REACT_APP_API_PATH + "/users/resetPassword";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status === 201 || response.status === 401 || response.status === 404 || response.status === 400) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                if (data.message) {
                    setDialogContent(data.message);
                }
                setProgress(false);
                setOpen(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setDialogContent('An error occurred while processing the request.');
                setProgress(false);
                setOpen(true);
            });
    };

    const canSubmit = code.trim() !== '' && password.trim() && rePassword.trim() && isEmailValid;

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <IconHeartbeat/>
                </Avatar>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Status</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
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
        </Container>
    );
};

export default ResetPassword;
