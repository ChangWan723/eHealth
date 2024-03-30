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
            doctorId: 'D1001',
            doctorName: 'Dr. Smith',
            prescription: 'Paracetamol, Cough Syrup',
        },
        {
            id: 'RX124',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            doctorId: 'D1001',
            doctorName: 'Dr. Smith',
            prescription: 'Paracetamol, Cough Syrup',
        },
        {
            id: 'RX125',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            doctorId: 'D1001',
            doctorName: 'Dr. Smith',
            prescription: 'Paracetamol, Cough Syrup',
        },
        {
            id: 'RX126',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            doctorId: 'D1001',
            doctorName: 'Dr. Smith',
            prescription: 'Paracetamol, Cough Syrup',
        },
        {
            id: 'RX127',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            doctorId: 'D1001',
            doctorName: 'Dr. Smith',
            prescription: 'Paracetamol, Cough Syrup',
        },
        {
            id: 'RX128',
            symptoms: 'Cough and fever',
            appointmentId: '123456',
            doctorId: 'D1001',
            doctorName: 'Dr. Smith',
            prescription: 'Paracetamol, Cough Syrup',
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
            <Box sx={{mb: 2}}>
                <Typography variant="h4" gutterBottom>
                    Prescription History
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="prescription history">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Prescription ID</HeaderCell>
                            <HeaderCell>Related Appointment ID</HeaderCell>
                            <HeaderCell>Symptoms Description</HeaderCell>
                            <HeaderCell>Prescribing Doctor ID</HeaderCell>
                            <HeaderCell>Prescribing Doctor Name</HeaderCell>
                            <HeaderCell>Prescription Details</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((prescription) => (
                            <TableRow key={prescription.id}>
                                <TableCell>{prescription.id}</TableCell>
                                <TableCell>{prescription.appointmentId}</TableCell>
                                <TableCell>{prescription.symptoms}</TableCell>
                                <TableCell>{prescription.doctorId}</TableCell>
                                <TableCell>{prescription.doctorName}</TableCell>
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
