import React, {useState} from 'react';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {useSearchParams} from 'react-router-dom';

const HealthTest = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        appointmentId: searchParams.get('id'),
        patientId: searchParams.get('patientId'),
        description: '',
        testTime: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    const checkFormValidity = () => {
        const { appointmentId, patientId, description, testTime } = formData;
        return appointmentId && patientId && description && testTime;
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
        const time = new Date(formData.testTime).getHours();

        if (time < 8 || time > 20) {
            setError('Please select a time between 08:00 and 20:00.');
            return;
        }
        setError('');
        console.log(formData);
    };

    const minDateTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,16);
    const maxDateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,16);

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Book a Health Test for Patients
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

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="Test Time"
                        name="testTime"
                        InputLabelProps={{ shrink: true }}
                        value={formData.testTime}
                        onChange={handleChange}
                        margin="normal"
                        required
                        inputProps={{ min: minDateTime, max: maxDateTime }}
                        helperText={error}
                        error={!!error}
                    />
                </Grid>

                <TextField
                    inputProps={{ maxLength: 1000 }}
                    required
                    fullWidth
                    id="tests"
                    label="Health Test Description"
                    name="description"
                    margin="normal"
                    multiline
                    rows={4}
                    value={formData.symptoms}
                    onChange={handleChange}
                />
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="body2">
                            Note: Please double check the Related Appointment ID, Patient ID before submitting. If the above information is incorrect, the test may be scheduled for the wrong patient.
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
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default HealthTest;
