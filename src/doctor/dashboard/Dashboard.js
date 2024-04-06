import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/shared/PageContainer';
import DataOverview from './components/DataOverview';
import RecentHealthTest from './components/RecentHealthTest';
import RecentAppointment from './components/RecentAppointment';
import DashboardCard from "../../components/shared/DashboardCard";
import HealthMap from "../../patient/dashboard/components/HealthMap";


const Dashboard = () => {
    localStorage.setItem('userType', 'doctor');

    return (
        <PageContainer title="eHealth" description="eHealth">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <DataOverview />
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <RecentHealthTest />
                    </Grid>
                    <Grid item xs={12} lg={7}>
                        <RecentAppointment />
                    </Grid>

                    <Grid item xs={12} lg={12} >
                        <DashboardCard title="Nearby Pharmacies">
                            <HealthMap/>
                        </DashboardCard>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Dashboard;