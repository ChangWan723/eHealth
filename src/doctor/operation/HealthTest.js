import React, {useState} from 'react';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {useSearchParams} from 'react-router-dom';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

const HealthTest = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        appointmentId: searchParams.get('id'),
        doctorId:  localStorage.getItem('doctorId'),
        description: '',
        testTime: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const checkFormValidity = () => {
        const { appointmentId, doctorId, description, testTime } = formData;
        return appointmentId && doctorId && description && testTime;
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

        const url = process.env.REACT_APP_API_PATH + "/doctors/sheduleTest";
        const requestBody = {
            appointmentId: formData.appointmentId,
            doctorId: formData.doctorId,
            testTime: formData.testTime.replace('T', ' '),
            testContent: formData.description,
            prescriptionDetails: formData.prescription
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setDialogContent(data.message || data.error.message);
                setOpen(true);
            })
            .catch(() => {
                setDialogContent("An error occurred while issuing the prescription.");
                setOpen(true);
            });

        setError('');
        console.log(formData);
    };

    const handleClose = () => {
        setOpen(false);
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
                    id="doctorId"
                    label="Patient ID"
                    name="doctorId"
                    margin="normal"
                    value={formData.doctorId}
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
    );
};

export default HealthTest;
