import React, {useEffect, useState} from 'react';
import {
    Container,
    TextField,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    FormGroup,
    Box,
    Button, FormLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const Medical = () => {
    // Assume this state is fetched from an API
    const [patientData, setPatientData] = useState({
        patientId: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
    });

    // State for form fields that can be edited
    const [medicalHistory, setMedicalHistory] = useState({
        symptoms: 'N/A',
        currentMedications: 'N/A',
        medicationAllergies: 'N/A',
        testHistory: 'N/A',
        tobaccoUse: 'no',
        illegalDrugUse: 'no',
        alcoholConsumption: 'Never',
        otherDescription: 'N/A',
    });

    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    useEffect(() => {
        const medicalUrl = process.env.REACT_APP_API_PATH + "/patients/medicalHistory";

        fetch(medicalUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                const history = data.medicalHistory;
                setPatientData({
                    patientId: history.patient._id,
                    firstName: history.patient.firstName,
                    lastName: history.patient.lastName,
                    email: history.patient.email,
                    gender: history.patient.gender,
                });

                setMedicalHistory(prevState => ({
                    symptoms: history.symptoms || prevState.symptoms,
                    currentMedications: history.currentMedications || prevState.currentMedications,
                    medicationAllergies: history.medicationAllergies || prevState.medicationAllergies,
                    tobaccoUse: history.tobaccoUse || prevState.tobaccoUse,
                    testHistory: history.healthTestResults
                        .filter(test => test.status === 'Pending') // TODO
                        .map(test => `${test.testContent} on ${test.testTime}, Result: ${test.result}`)
                        .join('\n') || prevState.testHistory,
                    illegalDrugUse: history.illegalDrugUse || prevState.illegalDrugUse,
                    alcoholConsumption: history.alcoholConsumption || prevState.alcoholConsumption,
                    otherDescription: history.otherDescription || prevState.otherDescription,
                }));


            })
            .catch(error => {
                console.error('Failed to fetch medical history:', error);
            });
    }, []);

    // Handle changes in the editable form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMedicalHistory(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setMedicalHistory(prevState => ({
            ...prevState,
            [name]: checked ? 'yes' : 'no',
        }));
    };

    // Placeholder function to simulate updating data
    const handleUpdate = async () => {
        const url = process.env.REACT_APP_API_PATH + "/patients/medicalHistory";

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(medicalHistory)
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
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Medical History Form
            </Typography>

            {/* Read-only fields */}
            <TextField
                label="Patient ID"
                value={patientData.patientId}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Patient First Name"
                value={patientData.firstName}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Patient Last Name"
                value={patientData.lastName}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Patient E-mail"
                value={patientData.email}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Gender"
                value={patientData.gender}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                label="History of Health Test Results"
                name="testHistory"
                value={medicalHistory.testHistory}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{ maxLength: 1000 }}
                rows={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            {/* Editable fields */}
            <TextField
                label="Current or past symptoms"
                name="symptoms"
                value={medicalHistory.symptoms}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{ maxLength: 1000 }}
                rows={3}
            />
            <TextField
                label="Medications currently being taken"
                name="currentMedications"
                value={medicalHistory.currentMedications}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{ maxLength: 1000 }}
                rows={3}
            />
            <TextField
                label="Medication allergies"
                name="medicationAllergies"
                value={medicalHistory.medicationAllergies}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{ maxLength: 1000 }}
                rows={3}
            />

            <TextField
                label="Other description"
                name="otherDescription"
                value={medicalHistory.otherDescription}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{ maxLength: 1000 }}
                rows={3}
            />

            {/* Binary questions */}
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={medicalHistory.tobaccoUse === 'yes'}
                            onChange={handleCheckboxChange} // Updated to handleCheckboxChange
                            name="tobaccoUse"
                        />
                    }
                    label="Do you use or do you have history of using tobacco?"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={medicalHistory.illegalDrugUse === 'yes'}
                            onChange={handleCheckboxChange} // Updated to handleCheckboxChange
                            name="illegalDrugUse"
                        />
                    }
                    label="Do you use or do you have history of using illegal drugs?"
                />
            </FormGroup>

            {/* Alcohol consumption */}

            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">How often do you consume alcohol?</FormLabel>
                <RadioGroup
                    name="alcoholConsumption"
                    value={medicalHistory.alcoholConsumption}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="Never" control={<Radio />} label="Never" />
                    <FormControlLabel value="Occasionally" control={<Radio />} label="Occasionally" />
                    <FormControlLabel value="Often" control={<Radio />} label="Often" />
                    <FormControlLabel value="Every day" control={<Radio />} label="Every day" />
                </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Appointment Status</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Medical;
