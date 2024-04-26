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

const PendingAppointment = () => {
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const minDateTime = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    const maxDateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

    const [doctorsByDepartment, setDoctorsByDepartment] = useState({
        'General': [],
        'Internal Medicine': [],
        'Surgery': [],
        'Obstetrics and Gynecology': [],
        'Pediatrics': [],
    });

    const departments = Object.keys(doctorsByDepartment);

    const [dialogDescription, setDialogDescription] = useState('');
    const [reAppointment, setReAppointment] = useState({
        department: '',
        doctor: '',
        appointmentTime: '',
    });

    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/appointments";

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                const formattedAppointments = data.appointments
                    .filter(appointment => appointment.status === "Pending")
                    .map(appointment => ({
                        appointmentId: appointment._id,
                        department: appointment.doctor.department,
                        patientId: appointment.patient._id,
                        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                        appointmentTime: appointment.appointmentTime,
                        description: appointment.description
                }));
                setPendingAppointments(formattedAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));

        const urlInfo = process.env.REACT_APP_API_PATH + "/doctors/info";
        fetch(urlInfo, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }) .then(response => response.json())
            .then(data => {
                const newDoctorsByDepartment = {};
                data.doctors.forEach(doctor => {
                    const fullName = `Dr. ${doctor.firstName.trim()} ${doctor.lastName.trim()} (${doctor._id})`;
                    if (!newDoctorsByDepartment[doctor.department]) {
                        newDoctorsByDepartment[doctor.department] = [];
                    }
                    newDoctorsByDepartment[doctor.department].push(fullName);
                });
                setDoctorsByDepartment(prev => ({ ...prev, ...newDoctorsByDepartment }));
            })
            .catch(error => console.error('Failed to fetch doctors:', error));
    }, []);

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const handleOpenDialog = (type, appointment) => {
        setDialogType(type);
        setSelectedAppointment(appointment);
        setDialogDescription('');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const extractDoctorId = (doctorString) => {
        const match = doctorString.match(/\(([^)]+)\)/);
        return match ? match[1] : null;
    };

    const handleDialogSubmit = () => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/handleAppointment";

        let requestBody;

        if (dialogType === 'Accept') {
            requestBody = {
                appointmentId: selectedAppointment.appointmentId,
                accept: dialogDescription
            };
        } else if (dialogType === 'Reject') {
            requestBody = {
                appointmentId: selectedAppointment.appointmentId,
                reject: dialogDescription
            };
        } else {
            requestBody = {
                appointmentId: selectedAppointment.appointmentId,
                reschedule: {
                    appointmentTime: reAppointment.appointmentTime.replace('T', ' '),
                    doctor: extractDoctorId(reAppointment.doctor)
                }
            };
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(requestBody)
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
                    setDialogContent(data.message);
                } else {
                    setDialogContent(data.error);
                }
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
            {pendingAppointments.length > 0 ? (
                <Stack spacing={2}>
                    {pendingAppointments.map((appointment) => (
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Appointment Status</DialogTitle>
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

export default PendingAppointment;
