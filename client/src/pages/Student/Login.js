import React,{ useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from 'react-router-dom'; 
import NavBar from '../../Components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('http://localhost:4000/api/v1/student/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true, // Include cookies in the request
      });
  
      if (response.status === 200) {
        const token = response.data.token;
        
        toast.success('Login successful');
        console.log('Login as a student');
        navigate('/');
      } else if (response.status === 401) {
        toast.error('Email or password is incorrect');
      }
    } catch (error) {
      console.error(error);
      toast.error("Email or password is incorrect");
    }
  };
  
  
  return (
 <Container sx={{margin:'100px auto'}}>
 <NavBar></NavBar>
 <ToastContainer />
     <form onSubmit={handleSubmit}>
    <TextField
      label="Email"
      variant="outlined"
      fullWidth
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      fullWidth
      margin="normal"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      type="submit"
    >
      Login
    </Button>
    <Typography sx={{marginTop:'20px'}} align="center" variant="body2">
      Don't have an account? <Link to="/student/register">Register</Link>
    </Typography>
  </form>
 </Container>
  );
};

export default Login;
