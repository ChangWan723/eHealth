import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HealthMap from "../../patient/dashboard/components/HealthMap";
import Container from "@mui/material/Container";

export default function Map() {
    return (
        <Container
            id="map"
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 3, sm: 6},
            }}
        >
            <Box
                sx={{
                    width: {sm: '100%', md: '60%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Nearby pharmacies
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    eHealth guides you to the nearest pharmacy to ensure timely access to your medication.
                </Typography>
            </Box>
            <HealthMap/>
        </Container>
    );
}
