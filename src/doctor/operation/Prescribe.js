import React, { useState } from 'react';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {useSearchParams} from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Prescribe = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        appointmentId: searchParams.get('id'),
        symptoms: '',
        prescription: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const checkFormValidity = () => {
        const { appointmentId, symptoms, prescription } = formData;
        return appointmentId && symptoms && prescription;
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

        const url = process.env.REACT_APP_API_PATH + "/doctors/prescribe";
        const requestBody = {
            appointmentId: formData.appointmentId,
            symptomDescription: formData.symptoms,
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
    };

    const handleClose = () => {
        setOpen(false);
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
                            Note: Please double check the Related Appointment ID, Patient ID before submitting. If there is an error in the above information, the prescription may be issued to the wrong patient.
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Prescription Status</DialogTitle>
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

export default Prescribe;
