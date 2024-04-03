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
        id: 'HT001',
        patientId: 'D2',
        patientName: 'Johnson',
        appointmentId: 'AP001',
        testContent: 'Blood Work',
        time: '2024-04-11 11:00',
    },
    {
        id: 'HT002',
        patientId: 'D2',
        patientName: 'Johnson',
        appointmentId: 'AP002',
        testContent: 'X-ray',
        time: '2024-04-11 11:00',
    },
    {
        id: 'HT003',
        patientId: 'D2',
        patientName: 'Johnson',
        appointmentId: 'AP003',
        testContent: 'MRI',
        time: '2024-04-11 11:00',
    },
    {
        id: 'HT004',
        patientId: 'D2',
        patientName: 'Johnson',
        appointmentId: 'AP002',
        testContent: 'X-ray',
        time: '2024-04-11 11:00',
    },
    // ... more appointments
];

const PendingTest = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedTest, setSelectedTest] = useState(null);

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
        console.log(`Submitted for test ID: ${selectedTest.id}, Description: ${dialogDescription}`);
        setDialogDescription('');
        handleCloseDialog();
    };

    return (
        <Box sx={{padding: 3}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Pending Tests
                </Typography>
            </Box>
            {mockTests.length > 0 ? (
                <Stack spacing={2}>
                    {mockTests.map((test) => (
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
        </Box>
    )
        ;
};

export default PendingTest;
