import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const doctorInformation = [
      {
        avatar: <Avatar alt="Emily Stanton" src="/images/doctors/emily-stanton.jpg" />,
        name: 'Dr. Emily Stanton',
        occupation: 'Internal Medicine',
        testimonial: "Dr. Stanton has a decade of experience in diagnosing and treating complex internal diseases. She's known for her patient-centered approach to care.",
      },
      {
        avatar: <Avatar alt="Alex Freeman" src="/images/doctors/alex-freeman.jpg" />,
        name: 'Dr. Alex Freeman',
        occupation: 'Surgery',
        testimonial: "With a steady hand and precise technique, Dr. Freeman specializes in minimally invasive surgery, promoting rapid recovery and reduced patient discomfort.",
      },
      {
        avatar: <Avatar alt="Sophia Patel" src="/images/doctors/sophia-patel.jpg" />,
        name: 'Dr. Sophia Patel',
        occupation: 'Obstetrics and Gynecology',
        testimonial: "Dr. Patel provides compassionate care through all stages of pregnancy and is an advocate for women's health in preventative screenings.",
      },
      {
        avatar: <Avatar alt="Johnathan Ng" src="/images/doctors/johnathan-ng.jpg" />,
        name: 'Dr. Johnathan Ng',
        occupation: 'Pediatrics',
        testimonial: "Dr. Ng’s passion lies in pediatric medicine, offering a friendly and nurturing approach to his young patients and their families.",
      },
      {
        avatar: <Avatar alt="Lisa Cho" src="/images/doctors/lisa-cho.jpg" />,
        name: 'Dr. Lisa Cho',
        occupation: 'Internal Medicine',
        testimonial: "With a focus on chronic disease management, Dr. Cho integrates lifestyle medicine into her practice to foster long-term wellness.",
      },
      {
        avatar: <Avatar alt="Omar Hassan" src="/images/doctors/omar-hassan.jpg" />,
        name: 'Dr. Omar Hassan',
        occupation: 'Surgery',
        testimonial: "Specializing in cardiothoracic surgery, Dr. Hassan is renowned for his work in heart and lung operations, contributing to innovative surgical techniques.",
      },
    ];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Doctor() {
  const theme = useTheme();

  return (
    <Container
      id="doctors"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Doctors
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We will provide you with professional medical advice. Doctors are the best from various fields.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {doctorInformation.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
