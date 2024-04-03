import React, { useState } from 'react';
import {
    Box,
    Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import Divider from "@mui/material/Divider";

const MedicalHistory = () => {
    const [patientId, setPatientId] = useState('');
    const [medicalHistory, setMedicalHistory] = useState({
        patientId: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        symptoms: '',
        currentMedication: '',
        medicationAllergies: '',
        tobaccoUse: '',
        illegalDrugUse: '',
        alcoholConsumption: '',
        otherNotes: '',
    });

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

    // 模拟API调用获取病历信息
    const fetchMedicalHistory = async (patientId) => {
        const mockResponse = {
            patientId: '123456789',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            gender: 'Female',
            symptoms: 'no',
            currentMedication: 'no',
            medicationAllergies: 'no',
            tobaccoUse: 'yes',
            illegalDrugUse: 'no',
            alcoholConsumption: 'Occasionally',
            otherNotes: '',
        };
        setMedicalHistory(mockResponse);
    };

    const handleSearch = () => {
        fetchMedicalHistory(patientId);
    };

    const handleUpdate = () => {
        console.log('Updating medical history for patient ID:', patientId);
        console.log(medicalHistory);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                View / Modify Medical History
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                <TextField
                    label="Patient ID"
                    variant="outlined"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleSearch} sx={{margin: 5}}>
                    Search
                </Button>
            </Box>

            <Divider>
                <Chip label="Search Result" size="small" />
            </Divider>

            <TextField
                label="Patient ID"
                value={medicalHistory.patientId}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Patient First Name"
                value={medicalHistory.firstName}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Patient Last Name"
                value={medicalHistory.lastName}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Patient E-mail"
                value={medicalHistory.email}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
                label="Gender"
                value={medicalHistory.gender}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            {/* Editable fields */}
            <TextField
                label="Symptoms you are currently experiencing"
                name="symptoms"
                value={medicalHistory.symptoms}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
            />
            <TextField
                label="Medications you are currently taking"
                name="currentMedication"
                value={medicalHistory.currentMedication}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Medication allergies you have"
                name="medicationAllergies"
                value={medicalHistory.medicationAllergies}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
            />

            <TextField
                label="Other description"
                name="otherNotes"
                value={medicalHistory.otherNotes}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
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
        </Box>
    );
};

export default MedicalHistory;
