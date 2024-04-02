import React, {useState} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Container,
    Box,
    TablePagination,
} from '@mui/material';
import {styled} from '@mui/material/styles';

// Customized TableCell for the header
const HeaderCell = styled(TableCell)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const Prescription = () => {
    // Dummy data for prescription history
    const prescriptions = [
        // Add more records as needed for pagination
        {
            id: 'RX123',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            patientId: 'D1001',
            patientName: 'Smith',
            prescription: 'Paracetamol, Cough Syrup',
            time: '2024-04-11 11:00',
        },
        {
            id: 'RX124',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            patientId: 'D1001',
            patientName: 'Smith',
            prescription: 'Paracetamol, Cough Syrup',
            time: '2024-04-11 11:00',
        },
        {
            id: 'RX125',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            patientId: 'D1001',
            patientName: 'Smith',
            prescription: 'Paracetamol, Cough Syrup',
            time: '2024-04-11 11:00',
        },
        {
            id: 'RX126',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            patientId: 'D1001',
            patientName: 'Smith',
            prescription: 'Paracetamol, Cough Syrup',
            time: '2024-04-11 11:00',
        },
        {
            id: 'RX127',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            patientId: 'D1001',
            patientName: 'Smith',
            prescription: 'Paracetamol, Cough Syrup',
            time: '2024-04-11 11:00',
        },
        {
            id: 'RX128',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            patientId: 'D1001',
            patientName: 'Smith',
            prescription: 'Paracetamol, Cough Syrup',
            time: '2024-04-11 11:00',
        },
        // ... more records
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page after changing number of rows per page
    };

    // Only show the rows for the current page
    const currentRows = prescriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Prescription Records
                </Typography>
            </Box>
            <TableContainer component={Paper} sx={{marginTop: 2}}>
                <Table aria-label="prescription history">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Prescription ID</HeaderCell>
                            <HeaderCell>Appointment ID</HeaderCell>
                            <HeaderCell>Patient</HeaderCell>
                            <HeaderCell>Time</HeaderCell>
                            <HeaderCell>Symptoms Description</HeaderCell>
                            <HeaderCell>Prescription Details</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((prescription) => (
                            <TableRow key={prescription.id}>
                                <TableCell>{prescription.id}</TableCell>
                                <TableCell sx={{width: '60px'}}>{prescription.appointmentId}</TableCell>
                                <TableCell align="left" sx={{width: '120px'}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {prescription.patientName}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {prescription.patientId}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{prescription.time}</TableCell>
                                <TableCell>{prescription.symptoms}</TableCell>
                                <TableCell>{prescription.prescription}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="box"
                count={prescriptions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    )
        ;
};

export default Prescription;
