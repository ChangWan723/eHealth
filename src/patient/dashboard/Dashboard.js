import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DataOverview from './components/DataOverview';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';


const Dashboard = () => {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <DataOverview />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <RecentTransactions />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProductPerformance />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Dashboard;