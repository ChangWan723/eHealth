import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
    IconChartHistogram, IconFirstAidKit, IconReportAnalytics
} from '@tabler/icons-react';
import pharmacyImage from 'src/assets/images/home/pharmacy.jpg';
import recordImage from 'src/assets/images/home/record.jpg';
import analyticsImage from 'src/assets/images/home/analytics.jpg';

const items = [
    {
        icon: <IconChartHistogram/>,
        title: 'Annual Data Analytics',
        description:
            'eHealth visualizes yearly consultation data, allowing patients and doctors to easily track health trends and key metrics.',
        image: `url(${analyticsImage})`,
    },
    {
        icon: <IconFirstAidKit/>,
        title: 'Nearby Pharmacy Locator',
        description:
            'Integrated mapping services guide users to the closest pharmacies, ensuring timely access to medications.',
        image: `url(${pharmacyImage})`,
    },
    {
        icon: <IconReportAnalytics/>,
        title: 'Electronic Medical Records Management',
        description:
            'eHealth provides a secure and convenient platform for managing all electronic medical records, from appointments to test results and electronic prescriptions.',
        image: `url(${recordImage})`,
    },
];

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container id="features" sx={{py: {xs: 8, sm: 16}}}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <div>
                        <Typography component="h2" variant="h4" color="text.primary">
                            eHealth features
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{mb: {xs: 2, sm: 4}}}
                        >
                            eHealth is a comprehensive health care platform designed to enhance the management of
                            electronic health records.
                            It streamlines the healthcare experience with a focus on efficiency and accessibility.
                        </Typography>
                    </div>
                    <Grid container item gap={1} sx={{display: {xs: 'auto', sm: 'none'}}}>
                        {items.map(({title}, index) => (
                            <Chip
                                key={index}
                                label={title}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    borderColor: (theme) => {
                                        return selectedItemIndex === index ? 'primary.light' : '';
                                    },
                                    background: (theme) => {
                                        return selectedItemIndex === index ? 'none' : '';
                                    },
                                    backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                                    '& .MuiChip-label': {
                                        color: selectedItemIndex === index ? '#fff' : '',
                                    },
                                }}
                            />
                        ))}
                    </Grid>
                    <Box
                        component={Card}
                        variant="outlined"
                        sx={{
                            display: {xs: 'auto', sm: 'none'},
                            mt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundImage: (theme) =>
                                    items[selectedItemIndex].image,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                minHeight: 280,
                            }}
                        />
                        <Box sx={{px: 2, pb: 2}}>
                            <Typography color="text.primary" variant="body2" fontWeight="bold">
                                {selectedFeature.title}
                            </Typography>
                            <Typography color="text.secondary" variant="body2" sx={{my: 0.5}}>
                                {selectedFeature.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                        useFlexGap
                        sx={{width: '100%', display: {xs: 'none', sm: 'flex'}}}
                    >
                        {items.map(({icon, title, description}, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                component={Button}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    p: 3,
                                    height: 'fit-content',
                                    width: '100%',
                                    background: 'none',
                                    backgroundColor:
                                        selectedItemIndex === index ? 'action.selected' : undefined,
                                    borderColor: (theme) => {
                                        return selectedItemIndex === index
                                            ? 'primary.light'
                                            : 'grey.200';
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        textAlign: 'left',
                                        flexDirection: {xs: 'column', md: 'row'},
                                        alignItems: {md: 'center'},
                                        gap: 2.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: (theme) => {
                                                return selectedItemIndex === index
                                                    ? 'primary.main'
                                                    : 'grey.300';
                                            },
                                        }}
                                    >
                                        {icon}
                                    </Box>
                                    <Box sx={{textTransform: 'none'}}>
                                        <Typography
                                            color="text.primary"
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {title}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{my: 0.5}}
                                        >
                                            {description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{display: {xs: 'none', sm: 'flex'}, width: '100%'}}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: {xs: 'none', sm: 'flex'},
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                m: 'auto',
                                width: 420,
                                height: 500,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundImage: (theme) => items[selectedItemIndex].image,
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
