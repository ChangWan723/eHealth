import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, Button, Typography, Grid, Paper } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const Application = () => {
    const [responseMessage, setResponseMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const departments = [
        'General',
        'Internal Medicine',
        'Surgery',
        'Obstetrics and Gynecology',
        'Pediatrics',
    ];

    // Dummy data for doctors by department
    const [doctorsByDepartment, setDoctorsByDepartment] = useState({
        'General': [],
        'Internal Medicine': [],
        'Surgery': [],
        'Obstetrics and Gynecology': [],
        'Pediatrics': [],
    });

    const [appointment, setAppointment] = useState({
        patientId: '',
        patientName: '',
        department: '',
        doctor: '',
        appointmentTime: '',
        description: '',
    });

    useEffect(() => {
        appointment.patientId = localStorage.getItem('patientId');
        appointment.patientName = localStorage.getItem('patientName');

        const url = process.env.REACT_APP_API_PATH + "/doctors/info";
        fetch(url, {
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

    // Fetch doctors based on selected department
    const [availableDoctors, setAvailableDoctors] = useState([]);

    useEffect(() => {
        setAvailableDoctors(doctorsByDepartment[appointment.department] || []);
    }, [appointment.department]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment(prev => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'department') {
            setAppointment(prev => ({ ...prev, doctor: '' }));
        }
    };

    const isFormValid = () => {
        return appointment.department && appointment.doctor && appointment.appointmentTime && appointment.description;
    };

    // Current time + 1 hour and 1 month for min and max appointment time
    const minDateTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,16);
    const maxDateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,16);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) return;

        const extractDoctorId = (doctorString) => {
            const match = doctorString.match(/\(([^)]+)\)/);
            return match ? match[1] : null;
        };

        const doctorId = extractDoctorId(appointment.doctor);

        const appointmentDetails = {
            patientId: appointment.patientId,
            doctorId: doctorId,
            appointmentTime: appointment.appointmentTime,
            description: appointment.description
        };

        const url = process.env.REACT_APP_API_PATH + "/patients/appointments";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(appointmentDetails)
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 401 || response.status === 404 || response.status === 500) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                if (data.message) {
                    setResponseMessage(data.message);
                } else if (data.error) {
                    setResponseMessage(data.error.message);
                }
                setOpenDialog(true);
            })
            .catch(error => {
                setResponseMessage(error.message);
                setOpenDialog(true);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Book an Appointment
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Patient ID"
                            name="patientId"
                            value={appointment.patientId}
                            InputProps={{
                                readOnly: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Patient Name"
                            name="patientName"
                            value={appointment.patientName}
                            InputProps={{
                                readOnly: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Department"
                            name="department"
                            value={appointment.department}
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Expected Doctor"
                            name="doctor"
                            value={appointment.doctor}
                            onChange={handleChange}
                            margin="normal"
                            required
                            disabled={!appointment.department}
                        >
                            {availableDoctors.map((doctor) => (
                                <MenuItem key={doctor} value={doctor}>
                                    {doctor}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="datetime-local"
                            label="Expected Appointment Time"
                            name="appointmentTime"
                            InputLabelProps={{ shrink: true }}
                            value={appointment.appointmentTime}
                            onChange={handleChange}
                            margin="normal"
                            required
                            inputProps={{ min: minDateTime, max: maxDateTime }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Condition Description"
                            name="description"
                            multiline
                            rows={4}
                            value={appointment.description}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                            <Typography variant="body2">
                                Note: The doctor and time you choose are your preferred options. We will try our best to accommodate your request, but the final appointment details may vary due to doctor availability and your specific medical needs. You will receive a notification once your appointment is processed. Please check for updates.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>
                            Book Appointment
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Response"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {responseMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Application;
