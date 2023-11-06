import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Grid,
  Avatar,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBar from "../../Components/Navbar";

const AddandDeleteFaculty = () => {

  const [members, setMembers] = useState({
    name: '',
    position: '',
    description: '',
    year: '',
    branch: '',
    linkedin: '',
    github: '',
    instagram: ''
  });

  const initialFormData = {
    name: '',
    position: '',
    description: '',
    year: '',
    branch: '',
    linkedin: '',
    github: '',
    instagram: ''
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    console.log(members);
    try {
      const formData = new FormData();
      formData.append('name', members.name);
      formData.append('position', members.position);
      formData.append('description', members.description);
      formData.append('year', members.year);
      formData.append('branch', members.branch);
      formData.append('linkedin', members.linkedin);
      formData.append('github', members.github);
      formData.append('instagram', members.instagram);
      formData.append('my_file', selectedFile);
      console.log(members);
      console.log(selectedFile);
      const response = await axios.post(
        'http://localhost:4000/api/v1/admin/postMember',
        formData
      );
      console.log(response);
      // toast.success('Faculty Created!');
      // setFacultyData(initialFormData);
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
      // toast.error('Error: ' + error.message);
    } finally {
      setMembers(initialFormData);
      // setLoading(false);
    }
  };

  return (
    <>
    <NavBar></NavBar>
    <Container>
      <ToastContainer></ToastContainer>
      <Container maxWidth="sm">
        <form style={{ margin: '200px 0px' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Enter Position"
                name="position"
                value={members.position}
                onChange={(e) =>
                  setMembers({ ...members, position: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={members.description}
                onChange={(e) =>
                  setMembers({ ...members, description: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                value={members.year}
                onChange={(e) =>
                  setMembers({ ...members, year: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Branch"
                name="branch"
                value={members.branch}
                onChange={(e) =>
                  setMembers({ ...members, branch: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Linkedin"
                name="linkedin"
                value={members.linkedin}
                onChange={(e) =>
                  setMembers({ ...members, linkedin: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Github"
                name="github"
                value={members.github}
                onChange={(e) =>
                  setMembers({ ...members, github: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagram"
                value={members.instagram}
                onChange={(e) =>
                  setMembers({ ...members, instagram: e.target.value })
                }
                sx={{
    backgroundColor: 'white', // Set the background color to white
  }}
              />
            </Grid>
          </Grid>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ marginTop: '20px' }}
          >
            Upload file
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Button>

          <Button sx={{ marginTop: '20px', marginLeft: '20px' }} type="submit" variant="contained" color="primary">
            Submit {loading && <CircularProgress size="sm" style={{ color: 'white', marginLeft: '5px' }} />}
          </Button>
        </form>

      </Container>

    </Container>
    </>
  );
};

export default AddandDeleteFaculty;
