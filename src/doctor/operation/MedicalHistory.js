import React, {useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Chip, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const MedicalHistory = () => {
    const [patientId, setPatientId] = useState('');
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [openProgress, setProgress] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState({
        patientId: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        symptoms: '',
        currentMedications: '',
        medicationAllergies: '',
        tobaccoUse: '',
        illegalDrugUse: '',
        alcoholConsumption: '',
        testHistory: '',
        otherDescription: '',
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setMedicalHistory(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setMedicalHistory(prevState => ({
            ...prevState,
            [name]: checked ? 'yes' : 'no',
        }));
    };

    const fetchMedicalHistory = async (patientId) => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/medicalHistory?patientId=" + patientId;
        const token = localStorage.getItem('token');
        setProgress(true);
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.status === 401) {
                    console.log('Auth failed!');
                    return;
                }
                if (response.status === 500) {
                    console.error('Server error occurred');
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data && data.medicalhistory) {
                    const history = data.medicalhistory;
                    setMedicalHistory({
                        patientId: history.patient._id,
                        firstName: history.patient.firstName,
                        lastName: history.patient.lastName,
                        email: history.patient.email,
                        gender: history.patient.gender,
                        symptoms: history.symptoms,
                        currentMedications: history.currentMedications,
                        medicationAllergies: history.medicationAllergies,
                        tobaccoUse: history.tobaccoUse || 'no',
                        illegalDrugUse: history.illegalDrugUse || 'no',
                        alcoholConsumption: history.alcoholConsumption || 'Never',
                        otherDescription: history.otherDescription,
                        testHistory: history.healthTestResults
                            .filter(test => test.status === 'Completed')
                            .map(test => `${test.testContent} on ${test.testTime}, Result: ${test.result}`)
                            .join('\n'),
                    });
                }
                setProgress(false);
            })
            .catch(error => {
                console.error('Error fetching medical history:', error);
                setProgress(false);
            });
    };

    const handleSearch = () => {
        fetchMedicalHistory(patientId);
    };

    const handleUpdate = () => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/medicalHistory";

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
        <Box sx={{maxWidth: 600, mx: 'auto', mt: 4}}>
            <Typography variant="h4" gutterBottom>
                View / Modify Medical History
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <TextField
                    label="Patient ID"
                    variant="outlined"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    sx={{mr: 1}}
                />
                <Button variant="contained" onClick={handleSearch} sx={{margin: 5}}>
                    Search
                </Button>
            </Box>

            <Divider>
                <Chip label="Search Result" size="small"/>
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
            <TextField
                label="History of Health Test Results"
                name="testHistory"
                value={medicalHistory.testHistory}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{maxLength: 1000}}
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
                inputProps={{maxLength: 1000}}
                rows={3}
            />
            <TextField
                label="Medications currently being taken"
                name="currentMedication"
                value={medicalHistory.currentMedications}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{maxLength: 1000}}
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
                inputProps={{maxLength: 1000}}
                rows={3}
            />

            <TextField
                label="Other description"
                name="otherNotes"
                value={medicalHistory.otherDescription}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                multiline
                inputProps={{maxLength: 1000}}
                rows={3}
            />

            {/* Binary questions */}
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={medicalHistory.tobaccoUse === 'yes'}
                            onChange={handleCheckboxChange}
                            name="tobaccoUse"
                        />
                    }
                    label="Do you use or do you have history of using tobacco?"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={medicalHistory.illegalDrugUse === 'yes'}
                            onChange={handleCheckboxChange}
                            name="illegalDrugUse"
                        />
                    }
                    label="Do you use or do you have history of using illegal drugs?"
                />
            </FormGroup>

            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">How often do you consume alcohol?</FormLabel>
                <RadioGroup
                    name="alcoholConsumption"
                    value={medicalHistory.alcoholConsumption}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="Never" control={<Radio/>} label="Never"/>
                    <FormControlLabel value="Occasionally" control={<Radio/>} label="Occasionally"/>
                    <FormControlLabel value="Often" control={<Radio/>} label="Often"/>
                    <FormControlLabel value="Every day" control={<Radio/>} label="Every day"/>
                </RadioGroup>
            </FormControl>

            <Box sx={{mt: 2}}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Status</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openProgress}>
                <div style={{
                    height: "60px",
                    width: "60px",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress/>
                </div>
            </Dialog>
        </Box>
    );
};

export default MedicalHistory;
