import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VanillaTilt from 'vanilla-tilt';
import { Container, Grid, IconButton, Box,Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import NavBar from '../../Components/Navbar';
import Tilt from 'react-vanilla-tilt';
import { Link } from 'react-router-dom';
import Footer from "../../Components/Footer";

const Members = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/members');
      setMembers(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
    <Container>
      <NavBar />

      <Grid style={{margin:'100px auto'}} container spacing={3}>
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Tilt
              options={{ scale: 2, max: 25 }}
              className="card"
              style={{
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2))',
                border: 'none',
                padding: '16px',
              }}
            >
              <center>
                <img src={member.image} alt="image" style={{ width: '100%' }} />
                <h1 style={{ color: 'white' }}>{member.name}</h1>
                <p>Position: {member.position}</p>
                <p>Year: {member.year}</p>
                <p>Branch: {member.branch}</p>
                <p>
                  <Typography
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                    }}
                  >
                    {member.description}
                  </Typography>
                </p>
                <Link to={member.github}>
                  <IconButton style={{ background: '#1DA1F2' }}>
                    <GitHubIcon />
                  </IconButton>
                </Link>
                <Link to={member.instagram}>
                  <IconButton style={{ background: '#e4405f' }}>
                    <InstagramIcon />
                  </IconButton>
                </Link>
                <Link to={member.linkedin}>
                  <IconButton style={{ background: '#0e76a8' }}>
                    <LinkedInIcon />
                  </IconButton>
                </Link>
              </center>
            </Tilt>
          </Grid>
        ))}
      </Grid>
      
    </Container>
    <Footer></Footer>
    </>
  );
};

export default Members;
