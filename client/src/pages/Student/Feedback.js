import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom'; 
import axios from "axios";
import { Container, Paper, Typography, Box } from '@mui/material';

function FeedbackPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const jwtStudentToken = Cookies.get('student_token');
  var decoded = {};
  if(jwtStudentToken){
    decoded = jwtDecode(jwtStudentToken);
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/v1/postFeedback`, {
        message: message,
        name: decoded.name,
        eventId: id,
      });
      // Clear the message input after submitting
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const [feedback, loadFeedback] = useState([]);
  const loadFeedbacks = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/getFeedbacks`, { id: id });
      loadFeedback(response.data.comments[0].comments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadFeedbacks();
  }, [feedback])

  return (
    <Container sx={{marginTop:'100px'}} maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="h4" align="center" style={{ marginBottom: '16px' }}>
          Feedback Page
        </Typography>
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={handleMessageChange}
          style={{ marginBottom: '16px' }}
        />
        <Button variant="contained" color="primary" onClick={submitFeedback}>
          Submit Feedback
        </Button>
      </Paper>

      {feedback.map((feedback, i) => (
        <Paper key={i} elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="div" sx={{fontSize:'12px'}} color="textSecondary">
            {feedback.time}
          </Typography>
          <Typography variant="h6" style={{ marginBottom: '8px' }}>
            {feedback.loggedinuser}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '8px' }}>
            {feedback.message}
          </Typography>
        </Paper>
      ))}
    </Container>
  );
}

export default FeedbackPage;
