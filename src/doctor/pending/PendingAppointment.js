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

const mockAppointments = [
    {
        appointmentId: 'APPT001',
        department: 'Cardiology',
        patientId: 'PT001',
        patientName: 'John Doe',
        appointmentTime: '2024-01-24 10:00',
        description: 'Routine heart checkup',
    }, {
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

const doctorsByDepartment = {
    'General': ['Dr. Smith', 'Dr. Brown'],
    'Internal Medicine': ['Dr. Wilson'],
    'Surgery': ['Dr. Taylor', 'Dr. Moore'],
    'Obstetrics and Gynecology': ['Dr. Jones'],
    'Pediatrics': ['Dr. Davis', 'Dr. Garcia'],
};

const departments = Object.keys(doctorsByDepartment);

const PendingAppointment = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const minDateTime = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    const maxDateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);


    const [dialogDescription, setDialogDescription] = useState('');
    const [reAppointment, setReAppointment] = useState({
        department: '',
        doctor: '',
        appointmentTime: '',
    });

    const handleOpenDialog = (type, appointment) => {
        setDialogType(type);
        setSelectedAppointment(appointment);
        setDialogDescription('');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = () => {
        if (dialogType === 'Reschedule') {
            console.log(`Rescheduled appointment ID: ${selectedAppointment.appointmentId}, New: ${reAppointment.appointmentTime}, ${reAppointment.department},${reAppointment.doctor}`);
        } else {
            console.log(`Submitted for appointment ID: ${selectedAppointment.appointmentId}, Description: ${dialogDescription}`);
        }

        setDialogDescription('');
        handleCloseDialog();
    };

    const [availableDoctors, setAvailableDoctors] = useState([]);

    useEffect(() => {
        setAvailableDoctors(doctorsByDepartment[reAppointment.department] || []);
    }, [reAppointment.department]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setReAppointment(prev => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'department') {
            setReAppointment(prev => ({...prev, doctor: ''}));
        }
    };

    const isFormValid = () => {
        return (reAppointment.department && reAppointment.doctor && reAppointment.appointmentTime) || dialogDescription;
    };

    return (
        <Box sx={{padding: 3}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Pending Appointments
                </Typography>
            </Box>
            {mockAppointments.length > 0 ? (
                <Stack spacing={2}>
                    {mockAppointments.map((appointment) => (
                        <Card key={appointment.appointmentId} sx={{boxShadow: 5}}>
                            <CardContent sx={{p: 2}}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {appointment.patientName}
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Patient ID: <Typography component="span"
                                                            fontWeight="bold">{appointment.patientId}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Appointment ID: <Typography component="span"
                                                                fontWeight="bold">{appointment.appointmentId}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Department: <Typography component="span"
                                                            fontWeight="bold">{appointment.department}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Time: <Typography component="span"
                                                      fontWeight="bold">{appointment.appointmentTime}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="body2" gutterBottom>
                                    Description: <Typography component="span"
                                                             fontWeight="bold">{appointment.description}</Typography>
                                </Typography>
                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button variant="outlined" color="success"
                                            onClick={() => handleOpenDialog('Accept', appointment)}>
                                        Accept
                                    </Button>
                                    <Button variant="outlined" color="error"
                                            onClick={() => handleOpenDialog('Reject', appointment)}>
                                        Reject
                                    </Button>
                                    <Button variant="outlined"
                                            onClick={() => handleOpenDialog('Reschedule', appointment)}>
                                        Reschedule
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
                    There are currently no pending appointments.
                </Typography>
            )}
            <Dialog open={openDialog} onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleCloseDialog();
                }
            }}>
                <DialogTitle>{`${dialogType} Appointment`}</DialogTitle>
                <DialogContent>
                    {dialogType === 'Reschedule' ? (
                        <Grid>
                            <TextField
                                fullWidth
                                select
                                label="Department"
                                name="department"
                                value={reAppointment.department}
                                onChange={handleChange}
                                margin="normal"
                                required
                            >
                                {departments.map((department) => (
                                    <MenuItem key={department} value={department}>
                                        {department}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Expected Doctor"
                                name="doctor"
                                value={reAppointment.doctor}
                                onChange={handleChange}
                                margin="normal"
                                required
                                disabled={!reAppointment.department}
                            >
                                {availableDoctors.map((doctor) => (
                                    <MenuItem key={doctor} value={doctor}>
                                        {doctor}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                type="datetime-local"
                                label="Expected Appointment Time"
                                name="appointmentTime"
                                InputLabelProps={{shrink: true}}
                                value={reAppointment.appointmentTime}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{min: minDateTime, max: maxDateTime}}
                            />
                        </Grid>
                    ) : (
                        <TextField
                            inputProps={{ maxLength: 1000 }}
                            autoFocus
                            multiline
                            rows={3}
                            margin="normal"
                            id="description"
                            label={dialogType === 'Reject' ? "Reason for Rejection" : "Description"}
                            type="text"
                            fullWidth
                            onChange={(e) => setDialogDescription(e.target.value)}
                        />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDialogSubmit} disabled={!isFormValid()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
        ;
};

export default PendingAppointment;
