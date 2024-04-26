import React, {useEffect, useState} from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Link
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const getStatusStyle = (status) => {
    switch (status) {
        case 'Pending':
            return {backgroundColor: '#ffeb3b', borderRadius: '4px', padding: '3px 10px', display: 'inline-block'};
        case 'Accepted':
            return {
                backgroundColor: '#4caf50',
                color: '#fff',
                borderRadius: '4px',
                padding: '3px 10px',
                display: 'inline-block'
            };
        case 'Rejected':
            return {
                backgroundColor: '#f44336',
                color: '#fff',
                borderRadius: '4px',
                padding: '3px 10px',
                display: 'inline-block'
            };
        default:
            return {};
    }
};

const RecentAppointment = () => {
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
                const formattedAppointments = data.appointments.slice(0, 5).map(appointment => ({
                    id: appointment._id,
                    patientId: appointment.patient._id,
                    patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                    description: appointment.description,
                    status: appointment.status,
                }));
                setAppointmentRecords(formattedAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <DashboardCard title="Recent Appointment">
            <Box sx={{ overflow: 'auto', width: { xs: '380px', sm: 'auto' }}}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Patient
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Description
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointmentRecords.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {record.patientName}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {record.patientId}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={getStatusStyle(record.status)}>
                                        {record.status}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {record.description}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default RecentAppointment;
