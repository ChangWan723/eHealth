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
            appointmentId: 'AP001',
            testContent: 'Blood Work',
            description: 'Complete blood count',
            status: 'Pending',
            result: 'N/A',
        },
        {
            id: 'HT002',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            description: 'Chest X-ray',
            status: 'Completed',
            result: 'No issues found',
        },
        {
            id: 'HT003',
            appointmentId: 'AP003',
            testContent: 'MRI',
            description: 'Brain MRI',
            status: 'Not Attended',
            result: 'N/A',
        },
        {
            id: 'HT004',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            description: 'Chest X-ray',
            status: 'Completed',
            result: 'No issues found',
        },
        {
            id: 'HT005',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            description: 'Chest X-ray',
            status: 'Completed',
            result: 'No issues found',
        },
        {
            id: 'HT006',
            appointmentId: 'AP002',
            testContent: 'X-ray',
            description: 'Chest X-ray',
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
            <TableContainer component={Paper}>
                <Table aria-label="health test records">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Health Test ID</HeaderCell>
                            <HeaderCell>Related Appointment ID</HeaderCell>
                            <HeaderCell>Test Content</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                            <HeaderCell>Result</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTests.map((test) => (
                            <TableRow key={test.id}>
                                <TableCell>{test.id}</TableCell>
                                <TableCell>{test.appointmentId}</TableCell>
                                <TableCell>{test.testContent}</TableCell>
                                <TableCell>{test.description}</TableCell>
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
