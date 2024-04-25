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


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/patients/appointments";


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
                    department: appointment.doctor.department,
                    doctorId: appointment.doctor._id,
                    doctorName: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
                    appointmentTime: appointment.appointmentTime,
                    description: appointment.description,
                    status: appointment.status,
                    result: appointment.processingInstruction
                }));
                setAppointmentRecords(formattedAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

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
                            <HeaderCell align="left">Department</HeaderCell>
                            <HeaderCell align="left">Doctor</HeaderCell>
                            <HeaderCell align="left">Appointment Time</HeaderCell>
                            <HeaderCell align="left">Description</HeaderCell>
                            <HeaderCell align="left">Status</HeaderCell>
                            <HeaderCell align="left">Result Description</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecords.map((row) => (
                            <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell sx={{ width: '60px' }}>{row.id}</TableCell>
                                <TableCell align="left">{row.department}</TableCell>
                                <TableCell align="left" sx={{ width: '120px' }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {row.doctorName}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {row.doctorId}
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
