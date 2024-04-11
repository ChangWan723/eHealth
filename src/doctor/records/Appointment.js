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
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

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
        case 'Accepted':
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
            patientId: 'D1',
            patientName: 'Smith',
            appointmentTime: '2024-04-10 14:00',
            description: 'Routine check-up',
            status: 'Pending',
            result: 'N/A'
        },
        {
            id: 'A2',
            patientId: 'D2',
            patientName: 'Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Accepted',
            result: 'Vaccination Accepted successfully'
        },
        {
            id: 'A3',
            patientId: 'D3',
            patientName: 'Williams',
            appointmentTime: '2024-04-15 09:30',
            description: 'Consultation',
            status: 'Rejected',
            result: 'Appointment rescheduled'
        },
        {
            id: 'A4',
            patientId: 'D2',
            patientName: 'Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Accepted',
            result: 'Vaccination Accepted successfully'
        },
        {
            id: 'A5',
            patientId: 'D2',
            patientName: 'Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Accepted',
            result: 'Vaccination Accepted successfully'
        },
        {
            id: 'A6',
            patientId: 'D2',
            patientName: 'Johnson',
            appointmentTime: '2024-04-11 11:00',
            description: 'Regular vaccination',
            status: 'Accepted',
            result: 'Vaccination Accepted successfully'
        },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRecords = appointmentRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



    const handleIssuePrescription = (id, patientId) => {
        navigate(`/doctor/operation/prescribe?id=${id}&patientId=${patientId}`);
    }


    const handleScheduleHealthTest = (id, patientId) => {
        navigate(`/doctor/operation/healthtest?id=${id}&patientId=${patientId}`);
    }

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Appointment Records
                </Typography>
            </Box>
            <TableContainer component={Paper} sx={{marginTop: 2}}>
                <Table aria-label="appointment records">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Appointment ID</HeaderCell>
                            <HeaderCell align="left">Patient</HeaderCell>
                            <HeaderCell align="left">Appointment Time</HeaderCell>
                            <HeaderCell align="left">Description</HeaderCell>
                            <HeaderCell align="left">Status</HeaderCell>
                            <HeaderCell align="left">Result Description</HeaderCell>
                            <HeaderCell align="left">Actions</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecords.map((row) => (
                            <TableRow key={row.id}  sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                // Adding a border to each row, except the last one
                                '&:not(:last-child) td, &:not(:last-child) th': { borderBottom: '1px solid #000' }, // Use a darker color and thicker line for emphasis
                            }}>
                                <TableCell sx={{ width: '60px' }}>{row.id}</TableCell>
                                <TableCell align="left" sx={{ width: '120px' }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {row.patientName}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {row.patientId}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{row.appointmentTime}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">
                                    <Box sx={getStatusStyle(row.status)}>
                                        {row.status}
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{row.result}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        disabled={row.status !== 'Accepted'}
                                        onClick={() => handleIssuePrescription(row.id, row.patientId)}
                                    >
                                        Prescribe
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled={row.status !== 'Accepted'}
                                        onClick={() => handleScheduleHealthTest(row.id, row.patientId)}
                                        sx={{ mt: 2 }}
                                    >
                                        Book Test
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={appointmentRecords.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
};

export default Appointment;
