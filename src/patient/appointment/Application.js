import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, Button, Typography, Grid, Paper } from '@mui/material';

const Application = () => {
    const patientInfo = {
        id: "123456",
        name: "John Doe"
    };

    const departments = [
        'General',
        'Internal Medicine',
        'Surgery',
        'Obstetrics and Gynecology',
        'Pediatrics',
    ];

    // Dummy data for doctors by department
    const doctorsByDepartment = {
        'General': ['Dr. Smith', 'Dr. Brown'],
        'Internal Medicine': ['Dr. Wilson'],
        'Surgery': ['Dr. Taylor', 'Dr. Moore'],
        'Obstetrics and Gynecology': ['Dr. Jones'],
        'Pediatrics': ['Dr. Davis', 'Dr. Garcia'],
    };

    const [appointment, setAppointment] = useState({
        patientId: patientInfo.id,
        patientName: patientInfo.name,
        department: '',
        doctor: '',
        appointmentTime: '',
        description: '',
    });

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
    const minDateTime = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0,16);
    const maxDateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,16);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) return;

        try {
            const response = fetch('/users/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authentication headers here if needed
                },
                body: JSON.stringify(appointment),
            });
            if (!response.ok) throw new Error('Failed to create appointment');
            // Handle response data here
            alert('Appointment booked successfully');
        } catch (err) {

        } finally {

        }
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
        </Container>
    );
};

export default Application;
