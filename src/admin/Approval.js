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

const Approval = () => {
    localStorage.setItem('userType', 'admin');

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [userID, setUserID] = useState(null);
    const [usersInfo, setUsersInfo] = useState([]);
    const [isVisible, setIsVisible ] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const handleOpenDialog = (type, userID) => {
        setDialogType(type);
        setUserID(userID);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = () => {
        let requestBody = {
            action: dialogType,
            patientId: userID
        };

        const url = process.env.REACT_APP_API_PATH + "/admins/handle";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.status === 201 || response.status === 401 || response.status === 400 || response.status === 404 || response.status === 500) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                setDialogContent(data.message || data.error.message);
                setOpen(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setDialogContent('An error occurred while processing the request.');
                setOpen(true);
            });

        handleCloseDialog();
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const url = process.env.REACT_APP_API_PATH + "/admins/handle";

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const formattedUsers = data.patients.map(patient => ({
                        userId: patient._id,
                        userName: patient.firstName,
                        email: patient.email,
                        address: patient.address,
                        birthday: patient.birthday,
                        gender: patient.gender.toLowerCase()
                    }));
                    setUsersInfo(formattedUsers);
                    setIsVisible(true);
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Box sx={{padding: 3}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Approval of Registration
                </Typography>
            </Box>
            {usersInfo.length > 0 ? (
                <Stack spacing={2}>
                    {usersInfo.map((user) => (
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
                                            onClick={() => handleOpenDialog('approved', user.userId)}>
                                        Accept
                                    </Button>
                                    <Button variant="outlined" color="error"
                                            onClick={() => handleOpenDialog('rejected', user.userId)}>
                                        Reject
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            ) : (
                <div>
                    {isVisible &&
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
                        </Typography>}
                </div>
            )}
            <Dialog open={openDialog} onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleCloseDialog();
                }
            }}>
                <DialogTitle>{`Approval of Registration`}</DialogTitle>
                <DialogContent>
                    {dialogType === 'approved' ? (
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to approve the registration of this user?
                        </DialogContentText>
                    ) : (
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to reject the registration of this user?
                        </DialogContentText>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Approval Status</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
        ;
};

export default Approval;
