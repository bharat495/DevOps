import React from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';

const testimonials = [
  {
    name: 'John Doe',
    company: 'ABC Inc.',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis, sapien nec tristique viverra, urna urna interdum nisi, vel congue elit leo a dui.',
  },
  {
    name: 'Jane Smith',
    company: 'XYZ Corp.',
    comment: 'Curabitur sed sagittis erat. Nullam malesuada quam sit amet lacus hendrerit, in feugiat velit dapibus. Cras sit amet mattis odio.',
  },
  {
    name: 'Alice Johnson',
    company: 'PQR Ltd.',
    comment: 'Aenean eget hendrerit ex. In ut bibendum elit. Phasellus gravida nulla at urna bibendum, id suscipit dui ultrices.',
  },
];

const Testimonials = () => {
  return (
    <>
      <Box>
        <Box sx={{ paddingTop: '50px' }}>
          <Container>
            <Typography variant="h3" sx={{ color:'white',textAlign: 'center', mb: 4 }}>
              Testimonials
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((testimonial, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '20px' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                        {testimonial.company}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {testimonial.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        {/* Continue with your GUI section */}
      </Box>
    </>
  );
};

export default Testimonials;
