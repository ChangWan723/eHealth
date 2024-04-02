import React, { useState } from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
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

const getStatusStyle = (status) => {
    switch (status) {
        case 'Pending':
            return { backgroundColor: '#ffeb3b', borderRadius: '4px', padding: '3px 10px', display: 'inline-block' };
        case 'Completed':
            return { backgroundColor: '#4caf50', color: '#fff', borderRadius: '4px', padding: '3px 10px', display: 'inline-block' };
        case 'Not Attended':
            return { backgroundColor: '#f44336', color: '#fff', borderRadius: '4px', padding: '3px 10px', display: 'inline-block' };
        default:
            return {};
    }
};

const HealthTest = () => {
    // Dummy data for health tests
    const healthTests = [
        {
            id: 'HT001',
            patientId: 'D2',
            patientName: 'Dr. Johnson',
            appointmentId: 'AP001',
            testContent: 'Blood Work',
            time: '2024-04-11 11:00',
            status: 'Pending',
            result: 'N/A',
        },
        {
            id: 'HT002',
            patientId: 'D2',
            patientName: 'Dr. Johnson',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            time: '2024-04-11 11:00',
            status: 'Completed',
            result: 'No issues found',
        },
        {
            id: 'HT003',
            patientId: 'D2',
            patientName: 'Dr. Johnson',
            appointmentId: 'AP003',
            testContent: 'MRI',
            time: '2024-04-11 11:00',
            status: 'Not Attended',
            result: 'N/A',
        },
        {
            id: 'HT004',
            patientId: 'D2',
            patientName: 'Dr. Johnson',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            time: '2024-04-11 11:00',
            status: 'Completed',
            result: 'No issues found ',
        },
        {
            id: 'HT005',
            patientId: 'D2',
            patientName: 'Dr. Johnson',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            time: '2024-04-11 11:00',
            status: 'Completed',
            result: 'No issues found',
        },
        {
            id: 'HT006',
            patientId: 'D2',
            patientName: 'Dr. Johnson',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            time: '2024-04-11 11:00',
            status: 'Completed',
            result: 'No issues found',
        },
        // More health test records...
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    // Calculate the current page's records
    const filteredTests = healthTests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Health Test Records
            </Typography>
            <TableContainer component={Paper} sx={{marginTop: 2}}>
                <Table aria-label="health test records">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Health Test ID</HeaderCell>
                            <HeaderCell>Appointment ID</HeaderCell>
                            <HeaderCell>patient</HeaderCell>
                            <HeaderCell>Test Content</HeaderCell>
                            <HeaderCell>Time</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                            <HeaderCell>Result</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTests.map((test) => (
                            <TableRow key={test.id}>
                                <TableCell>{test.id}</TableCell>
                                <TableCell>{test.appointmentId}</TableCell>
                                <TableCell align="left" sx={{width: '120px'}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {test.patientName}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {test.patientId}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{test.testContent}</TableCell>
                                <TableCell>{test.time}</TableCell>
                                <TableCell align="left">
                                    <Box sx={getStatusStyle(test.status)}>
                                        {test.status}
                                    </Box>
                                </TableCell>
                                <TableCell>{test.result}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ py: 2 }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={healthTests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Container>
    );
};

export default HealthTest;
