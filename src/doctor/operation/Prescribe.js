import React, { useState } from 'react';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';

const Prescribe = () => {
    const [formData, setFormData] = useState({
        appointmentId: '',
        patientId: '',
        symptoms: '',
        prescription: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const checkFormValidity = () => {
        const { appointmentId, patientId, symptoms, prescription } = formData;
        return appointmentId && patientId && symptoms && prescription;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    React.useEffect(() => {
        setIsFormValid(checkFormValidity());
    }, [formData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Prescription Form
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    inputProps={{ maxLength: 50 }}
                    required
                    fullWidth
                    id="appointmentId"
                    label="Related Appointment ID"
                    name="appointmentId"
                    margin="normal"
                    value={formData.appointmentId}
                    onChange={handleChange}
                />
                <TextField
                    inputProps={{ maxLength: 50 }}
                    required
                    fullWidth
                    id="patientId"
                    label="Patient ID"
                    name="patientId"
                    margin="normal"
                    value={formData.patientId}
                    onChange={handleChange}
                />
                <TextField
                    inputProps={{ maxLength: 1000 }}
                    required
                    fullWidth
                    id="symptoms"
                    label="Symptoms Description"
                    name="symptoms"
                    margin="normal"
                    multiline
                    rows={4}
                    value={formData.symptoms}
                    onChange={handleChange}
                />
                <TextField
                    inputProps={{ maxLength: 1000 }}
                    required
                    fullWidth
                    id="prescription"
                    label="Prescription Details"
                    name="prescription"
                    margin="normal"
                    multiline
                    rows={4}
                    value={formData.prescription}
                    onChange={handleChange}
                />
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="body2">
                            Note: Please double check the Related Appointment ID, Patient ID before submitting. if there is an error in the above information, the prescription may be issued to the wrong patient.
                        </Typography>
                    </Paper>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    disabled={!isFormValid}
                >
                    Submit Prescription
                </Button>
            </Box>
        </Box>
    );
};

export default Prescribe;
