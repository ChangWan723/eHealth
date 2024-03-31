import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Box,
    TablePagination
} from '@mui/material';
import {styled} from '@mui/material/styles';

// Customized TableCell for the header
const HeaderCell = styled(TableCell)(({theme}) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const getStatusStyle = (status) => {
    switch (status) {
        case 'Pending':
            return {background: '#ffeb3b', borderRadius: '4px', padding: '3px 10px', display: 'inline-block'};
        case 'Completed':
            return {
                background: '#4caf50',
                color: '#fff',
                borderRadius: '4px',
                padding: '3px 10px',
                display: 'inline-block'
            };
        case 'Rejected':
            return {
                background: '#f44336',
                color: '#fff',
                borderRadius: '4px',
                padding: '3px 10px',
                display: 'inline-block'
            };
        default:
            return {};
    }
};

const Appointment = () => {

    const appointmentRecords = [
        {
            id: 'A1',
            department: 'General',
            doctorId: 'D1',
            doctorName: 'Dr. Smith',
            appointmentTime: '2024-04-10 14:00',
            description: 'Routine check-up',
            status: 'Pending',
            result: 'N/A'
        },
        {
            id: 'A2',
            department: 'Pediatrics',
            doctorId: 'D2',
            doctorName: 'Dr. Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Completed',
            result: 'Vaccination completed successfully'
        },
        {
            id: 'A3',
            department: 'Obstetrics and Gynecology',
            doctorId: 'D3',
            doctorName: 'Dr. Williams',
            appointmentTime: '2024-04-15 09:30',
            description: 'Consultation',
            status: 'Rejected',
            result: 'Appointment rescheduled'
        },
        {
            id: 'A4',
            department: 'Pediatrics',
            doctorId: 'D2',
            doctorName: 'Dr. Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Completed',
            result: 'Vaccination completed successfully'
        },
        {
            id: 'A5',
            department: 'Pediatrics',
            doctorId: 'D2',
            doctorName: 'Dr. Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Completed',
            result: 'Vaccination completed successfully'
        },
        {
            id: 'A6',
            department: 'Pediatrics',
            doctorId: 'D2',
            doctorName: 'Dr. Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Completed',
            result: 'Vaccination completed successfully'
        },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRecords = appointmentRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Box sx={{padding: 3}}>
                <Typography variant="h4" gutterBottom>
                    Appointment Records
                </Typography>
            </Box>
            <TableContainer component={Paper} sx={{marginTop: 2}}>
                <Table aria-label="appointment records">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Appointment ID</HeaderCell>
                            <HeaderCell align="left">Department</HeaderCell>
                            <HeaderCell align="left">Doctor ID</HeaderCell>
                            <HeaderCell align="left">Doctor Name</HeaderCell>
                            <HeaderCell align="left">Appointment Time</HeaderCell>
                            <HeaderCell align="left">Description</HeaderCell>
                            <HeaderCell align="left">Status</HeaderCell>
                            <HeaderCell align="left">Result Description</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecords.map((row) => (
                            <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="left">{row.department}</TableCell>
                                <TableCell align="left">{row.doctorId}</TableCell>
                                <TableCell align="left">{row.doctorName}</TableCell>
                                <TableCell align="left">{row.appointmentTime}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">
                                    <Box sx={getStatusStyle(row.status)}>
                                        {row.status}
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{row.result}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={appointmentRecords.length} // The total number of records
                rowsPerPage={rowsPerPage} // The number of records per page
                page={page} // The current page
                onPageChange={handleChangePage} // Handler for page change
                onRowsPerPageChange={handleChangeRowsPerPage} // Handler for rows per page change
            />
        </Container>
    );
};

export default Appointment;
