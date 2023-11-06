import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia, Grid, Link, Box } from '@mui/material';
import devopsvector from '../../Assets/7016019-removebg.png';
import NavBar from '../../Components/Navbar';
import About from './About'
import Testimonials from './Testmonial';
import Footer from '../../Components/Footer';

const phases = [
  "Plan", "Code", "Build", "Test", "Release", "Deploy", "Operate", "Monitor"
];

const HomePage = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Box sx={{
      height: '100vh',
      backgroundImage: `linear-gradient(to right, 
        #13072e 0%, 
        #1b1042 15%, 
        #261657 30%, 
        #321c6c 45%, 
        #3f2182 60%, 
        #321c6c 75%, 
        #1b1042 85%, 
        #13072e  100%)`,
    }}
    >
    <NavBar></NavBar>
      <Box
      className='home-main'
        sx={{
          height: '89vh',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop:'50px'
        }}
      >
        <Box 
        className='home-main-left'
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
         <Typography
         className='h6'
            variant="h6"
            sx={{
              color: '#13072E',
              textAlign: 'center',
              paddingTop: '20px',
            }}
          >
            <span style={{ borderRadius:'10px',padding:'7px',backgroundColor: '#B3AAFF',animation: 'changeText 8s linear infinite' }}>
              #{phases[phaseIndex]}
            </span>
          </Typography>
          <Typography
          className='h4'
            variant="h4"
            sx={{
              color: 'white',
              textAlign: 'center',
              paddingTop: '20px',
              fontWeight: 'bold'
            }}
          >
            Welcome to <span style={{color:'#b38600'}}>DevOps</span> club
          </Typography>
          <Typography
            className='h6'
            variant="h6"
            sx={{
              color: 'white',
              textAlign: 'justify',
              padding: '20px 100px',
            }}
          >
            DevOps is a student organization at the University of Texas at Dallas. We are a group of students who are passionate about DevOps and Cloud Computing. 
          </Typography>
        </Box>
       <Box
        className='home-main-right'
        sx={{
          width:'50%',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
       }}>
        <img
        className='devops-vector'
          style={{
            width: '600px',
            animation: 'floatAnimation 5s infinite'
          }}
          src={devopsvector}
          alt="DevOps Vector"
        />
       </Box>
      </Box>
    </Box>
  
    <About></About>

    <Testimonials></Testimonials>
    <Footer></Footer>
    </>
  );
};

export default HomePage;
