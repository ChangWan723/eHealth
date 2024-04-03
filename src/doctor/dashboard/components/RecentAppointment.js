import React from 'react';
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

const appointmentRecords = [
    {
        id: 'A1',
        department: 'General',
        patientId: 'D1',
        patientName: 'Smith',
        appointmentTime: '2024-04-10 14:00',
        description: 'Routine check-up',
        status: 'Pending',
        result: 'N/A'
    },
    {
        id: 'A2',
        department: 'Pediatrics',
        patientId: 'D2',
        patientName: 'Johnson',
        appointmentTime: '2024-04-11 11:00',
        description: 'Regular vaccination',
        status: 'Accepted',
        result: 'Vaccination Accepted successfully'
    },
    {
        id: 'A3',
        department: 'Obstetrics and Gynecology',
        patientId: 'D3',
        patientName: 'Williams',
        appointmentTime: '2024-04-15 09:30',
        description: 'Consultation',
        status: 'Rejected',
        result: 'Appointment rescheduled'
    },
    {
        id: 'A4',
        department: 'Pediatrics',
        patientId: 'D2',
        patientName: 'Johnson',
        appointmentTime: '2024-04-11 11:00',
        description: 'Regular vaccination',
        status: 'Accepted',
        result: 'Vaccination Accepted successfully'
    },
];

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
                                    ID
                                </Typography>
                            </TableCell>
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
                                <TableCell sx={{width: '60px'}}>
                                    <Typography
                                    >
                                        {record.id}
                                    </Typography>
                                </TableCell>
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
            <box>
                <Link color="primary" href="/patient/records/appointment">
                    See More Appointment
                </Link>
            </box>
        </DashboardCard>
    );
};

export default RecentAppointment;
