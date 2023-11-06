import React from 'react';
import { Box, Typography } from '@mui/material';
import about from '../../Assets/about.png'

const About = () => {
  return (
    <>
      <Box id='about' style={{
        color: 'white',
        padding: '40px 0px',
        width: '90%',
        backgroundColor: 'black',
        margin: '0px auto',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, #3f2182, #371e75, #301b69, #29175d, #231451, #1f124a, #1b1144, #180f3d, #160e39, #150c35, #140a32, #13072e)',
      }}
      >
        <Typography sx={{ textAlign: 'center' }} variant="h3">About</Typography>
        <Box className='about-main' sx={{
          display: 'flex',
        }}>
          <img
          id='about-img'
          style={{
            width: '50%',
            margin: '0px auto'

          }} src={about} alt='about_page'></img>
          <Typography 
          className='about-main-text'
          sx={{
            width: '50%',
            textAlign: 'justify',
            padding: '140px 40px',
          }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis, sapien nec tristique viverra, urna urna interdum nisi, vel congue elit leo a dui. Curabitur sed sagittis erat. Nullam malesuada quam sit amet lacus hendrerit, in feugiat velit dapibus. Cras sit amet mattis odio. Aenean eget hendrerit ex. In ut bibendum elit. Phasellus gravida nulla at urna bibendum, id suscipit dui ultrices.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default About