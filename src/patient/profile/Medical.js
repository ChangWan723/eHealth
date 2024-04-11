import React, { useState } from 'react';
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
    Button, FormLabel, FormControl
} from '@mui/material';

const Medical = () => {
    // Assume this state is fetched from an API
    const [patientData, setPatientData] = useState({
        patientId: '123456789',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        gender: 'Female',
    });

    // State for form fields that can be edited
    const [medicalHistory, setMedicalHistory] = useState({
        symptoms: 'N/A',
        currentMedication: 'N/A',
        medicationAllergies: 'N/A',
        testHistory: 'N/A',
        tobaccoUse: 'yes',
        illegalDrugUse: 'no',
        alcoholConsumption: 'Occasionally',
        otherNotes: '',
    });

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
        const dataToSend = {
            ...medicalHistory,
            patientId: patientData.patientId, // Add the patientId to the medicalHistory object
        };

        try {
            const response = await fetch('/users/history/medical', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other headers such as authentication tokens if necessary
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the successful response here
            const responseData = await response.json();
            console.log('Successfully updated medical history:', responseData);
        } catch (error) {
            // Handle the error here
            console.error('There was a problem with the fetch operation:', error);
        }
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
                name="currentMedication"
                value={medicalHistory.currentMedication}
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
                label="History of Health Test Results"
                name="testHistory"
                value={medicalHistory.testHistory}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{ maxLength: 1000 }}
                rows={3}
            />

            <TextField
                label="Other description"
                name="otherNotes"
                value={medicalHistory.otherNotes}
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
        </Container>
    );
};

export default Medical;
