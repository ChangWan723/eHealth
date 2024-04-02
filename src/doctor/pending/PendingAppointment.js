import React, {useState} from 'react';
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
    Stack
} from '@mui/material';
import { CheckCircleOutline, HighlightOff, Schedule } from '@mui/icons-material';

const mockAppointments = [
    {
        appointmentId: 'APPT001',
        department: 'Cardiology',
        patientId: 'PT001',
        patientName: 'John Doe',
        appointmentTime: '2024-01-24 10:00',
        description: 'Routine heart checkup',
    },{
        appointmentId: 'APPT002',
        department: 'Dermatology',
        patientId: 'PT002',
        patientName: 'Jane Smith',
        appointmentTime: '2024-02-15 09:30',
        description: 'Annual skin check',
    },
    {
        appointmentId: 'APPT003',
        department: 'Orthopedics',
        patientId: 'PT003',
        patientName: 'Michael Johnson',
        appointmentTime: '2024-03-20 14:00',
        description: 'Follow-up on knee surgery',
    },
    {
        appointmentId: 'APPT004',
        department: 'Pediatrics',
        patientId: 'PT004',
        patientName: 'Lucy Brown',
        appointmentTime: '2024-04-10 11:00',
        description: 'Regular child examination',
    }
    // ... more appointments
];

const PendingAppointment = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleOpenDialog = (type, appointment) => {
        setDialogType(type);
        setSelectedAppointment(appointment);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = () => {
        // Submit logic goes here
        console.log(`Submitted for ${dialogType}`);
        handleCloseDialog();
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Pending Appointments
                </Typography>
            </Box>
            {mockAppointments.length > 0 ? (
            <Stack spacing={2}>
                {mockAppointments.map((appointment) => (
                    <Card key={appointment.appointmentId} sx={{ boxShadow: 5 }}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {appointment.patientName}
                            </Typography>
                            <Typography color="textSecondary" variant="body2" gutterBottom>
                                Patient ID: <Typography component="span" fontWeight="bold">{appointment.patientId}</Typography>
                            </Typography>
                            <Typography color="textSecondary" variant="body2" gutterBottom>
                                Appointment ID: <Typography component="span" fontWeight="bold">{appointment.appointmentId}</Typography>
                            </Typography>
                            <Typography color="textSecondary" variant="body2" gutterBottom>
                                Department: <Typography component="span" fontWeight="bold">{appointment.department}</Typography>
                            </Typography>
                            <Typography color="textSecondary" variant="body2" gutterBottom>
                                Time: <Typography component="span" fontWeight="bold">{appointment.appointmentTime}</Typography>
                            </Typography>
                            <Typography color="textSecondary" variant="body2" gutterBottom>
                                Description: <Typography component="span" fontWeight="bold">{appointment.description}</Typography>
                            </Typography>
                            <Stack direction="row" spacing={1} mt={2}>
                                <Button variant="outlined" color="success" onClick={() => handleOpenDialog('Accept', appointment)}>
                                    Accept
                                </Button>
                                <Button variant="outlined" color="error" onClick={() => handleOpenDialog('Reject', appointment)}>
                                    Reject
                                </Button>
                                <Button variant="outlined" onClick={() => handleOpenDialog('Reschedule', appointment)}>
                                    Reschedule
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            ) : (
                <Typography variant="subtitle1"  sx={{
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
                    There are currently no pending appointments.
                </Typography>
            )}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{`${dialogType} Appointment`}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label={dialogType === 'Reject' ? "Reason for Rejection" : "Description"}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PendingAppointment;
