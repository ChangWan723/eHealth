import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Card,
    Grid,
    CardContent,
    Stack, MenuItem
} from '@mui/material';
import DialogContentText from "@mui/material/DialogContentText";

const mockTests = [
    {
        userId: 'D2',
        userName: 'Johnson',
        email: 'test@outlook.com',
        address: 'xxxx',
        birthday: '2024-04-11 11:00',
        gender: 'male',
    },
    {
        userId: 'D2',
        userName: 'Johnson',
        email: 'test@outlook.com',
        address: 'xxxx',
        birthday: '2024-04-11 11:00',
        gender: 'male',
    },
    {
        userId: 'D2',
        userName: 'Johnson',
        email: 'test@outlook.com',
        address: 'xxxxx',
        birthday: '2024-04-11 11:00',
        gender: 'male',
    },
    {
        userId: 'D2',
        userName: 'Johnson',
        email: 'test@outlook.com',
        address: 'xxxxx',
        birthday: '2024-04-11 11:00',
        gender: 'male',
    },
    // ... more appointments
];

const Approval = () => {
    localStorage.setItem('userType', 'admin');

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedTest, setSelectedTest] = useState(null);

    const [dialogDescription, setDialogDescription] = useState('');

    const handleOpenDialog = (type, test) => {
        setDialogType(type);
        setSelectedTest(test);
        setDialogDescription('');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = () => {
        setDialogDescription('');
        handleCloseDialog();
    };

    return (
        <Box sx={{padding: 3}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Approval of Registration
                </Typography>
            </Box>
            {mockTests.length > 0 ? (
                <Stack spacing={2}>
                    {mockTests.map((user) => (
                        <Card key={user.userId} sx={{boxShadow: 5}}>
                            <CardContent sx={{p: 2}}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {user.userName}
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    User ID: <Typography component="span"
                                                            fontWeight="bold">{user.userId}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Gender: <Typography component="span"
                                                          fontWeight="bold">{user.gender}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Email: <Typography component="span"
                                                         fontWeight="bold">{user.email}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Address: <Typography component="span"
                                                      fontWeight="bold">{user.address}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Birthday: <Typography component="span"
                                                                  fontWeight="bold">{user.birthday}</Typography>
                                </Typography>
                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button variant="outlined" color="success"
                                            onClick={() => handleOpenDialog('Accept', user)}>
                                        Accept
                                    </Button>
                                    <Button variant="outlined" color="error"
                                            onClick={() => handleOpenDialog('Reject', user)}>
                                        Reject
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            ) : (
                <Typography variant="subtitle1" sx={{
                    fontSize: "25px",
                    textAlign: 'center',
                    padding: '16px',
                    margin: '16px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '4px',
                    display: 'inline-block',
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                }}>
                    There are currently no pending tests.
                </Typography>
            )}
            <Dialog open={openDialog} onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleCloseDialog();
                }
            }}>
                <DialogTitle>{`Approval of Registration`}</DialogTitle>
                <DialogContent>
                    {dialogType === 'Accept' ? (
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to approve the registration of this user?
                        </DialogContentText>
                    ) : (
                        <TextField
                            inputProps={{ maxLength: 1000 }}
                            autoFocus
                            multiline
                            rows={3}
                            margin="normal"
                            id="description"
                            label="Reject Description"
                            type="text"
                            fullWidth
                            onChange={(e) => setDialogDescription(e.target.value)}
                        />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
        ;
};

export default Approval;
