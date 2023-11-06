import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import NavBar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';

const Event = () => {
  const navigate = useNavigate();
  const [comingSoonEvents, setComingSoonEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);

  const loadEvents = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/events');
    const comingSoon = response.data.events.filter(event => event.comming_soon === true);
    const notComingSoon = response.data.events.filter(event => event.comming_soon === false);
    setComingSoonEvents(comingSoon);
    setOtherEvents(notComingSoon);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
    <NavBar></NavBar>
      <Container style={{ marginTop: '100px' }} fluid>
      <Typography sx={{ color: 'white' }} variant="h4" gutterBottom>
        Coming Soon
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}  sx={{ flexGrow: 1 }}>
        {comingSoonEvents.map((data) => (
          <Grid item xs={2} sm={4} md={4} key={data._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 350 }} image={data.image} title="Event Image" />
              <Typography sx={{padding:'5px 20px'}} variant="h6" gutterBottom component="div">
                {data.title}
              </Typography>
              <CardContent>
                <Typography variant="body2" color="textSecondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,  
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal'
                }}>
                  {data.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography sx={{ marginTop: '50px', color: 'white' }} variant="h4" gutterBottom>
        Past Events
      </Typography>
      <Grid className='event-main'container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{ flexGrow: 1 }}>
        {otherEvents.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 350 }} image={data.image} title="Event Image" />
              <Typography sx={{padding:'5px 20px'}} variant="h6" gutterBottom component="div">
                {data.title}
              </Typography>
              <CardContent>
                <Typography variant="body2" color="textSecondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,  
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal'
                }}>
                  {data.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={()=> navigate(`/events/${data._id}`)} size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    <Footer></Footer>
    </>
  );
};

export default Event;
