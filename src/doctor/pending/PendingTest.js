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
    CardContent,
    Stack,
} from '@mui/material';
import DialogContentText from "@mui/material/DialogContentText";

const PendingTest = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isVisible, setIsVisible ] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedTest, setSelectedTest] = useState(null);
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const minDateTime = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    const maxDateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);


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
        let requestBody;

        if (dialogType === 'Complete') {
            requestBody = {
                testId: selectedTest.id,
                complete: dialogDescription
            };
        } else if (dialogType === 'Not Attend') {
            requestBody = {
                testId: selectedTest.id,
                notAttend: "true"
            };
        }

        const url = process.env.REACT_APP_API_PATH + "/doctors/handleTest";
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

        setDialogDescription('');
        handleCloseDialog();
    };

    const [pendingTests, setPendingTests] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/tests/consultedByMe";

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                const formattedTests = data.tests
                    .filter(test => test.status === "Pending")
                    .map(test => ({
                        id: test._id,
                        appointmentId: test.appointment._id,
                        patientId: test.appointment.patient._id,
                        patientName: `${test.appointment.patient.firstName} ${test.appointment.patient.lastName}`,
                        time: test.testTime,
                        testContent: test.testContent
                    }));
                setPendingTests(formattedTests);
                setIsVisible(true);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    return (
        <Box sx={{padding: 3}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Pending Tests
                </Typography>
            </Box>
            {pendingTests.length > 0 ? (
                <Stack spacing={2}>
                    {pendingTests.map((test) => (
                        <Card key={test.id} sx={{boxShadow: 5}}>
                            <CardContent sx={{p: 2}}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {test.patientName}
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Patient ID: <Typography component="span"
                                                            fontWeight="bold">{test.patientId}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Test ID: <Typography component="span"
                                                                fontWeight="bold">{test.id}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Time: <Typography component="span"
                                                      fontWeight="bold">{test.time}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Test Description: <Typography component="span"
                                                             fontWeight="bold">{test.testContent}</Typography>
                                </Typography>
                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button variant="outlined" color="success"
                                            onClick={() => handleOpenDialog('Complete', test)}>
                                        Complete
                                    </Button>
                                    <Button variant="outlined" color="error"
                                            onClick={() => handleOpenDialog('Not Attend', test)}>
                                        Not Attend
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
                <DialogTitle>{`Health Test`}</DialogTitle>
                <DialogContent>
                    {dialogType === 'Not Attend' ? (
                        <DialogContentText id="alert-dialog-description">
                            Are you sure the patient didn't attend the Health Test?
                        </DialogContentText>
                    ) : (
                        <TextField
                            inputProps={{ maxLength: 1000 }}
                            autoFocus
                            multiline
                            rows={3}
                            margin="normal"
                            id="description"
                            label="Result Description"
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Health Test Status</DialogTitle>
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

export default PendingTest;
