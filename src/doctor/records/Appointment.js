import React, {useEffect, useState} from 'react';
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
    const [appointmentRecords, setAppointmentRecords] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/doctors/appointments";


        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                const formattedAppointments = data.appointments.map(appointment => ({
                    id: appointment._id,
                    patientId: appointment.patient._id,
                    patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                    appointmentTime: appointment.appointmentTime,
                    description: appointment.description,
                    status: appointment.status,
                    result: appointment.processingInstruction
                }));
                setAppointmentRecords(formattedAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

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
                                        BookTest
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
