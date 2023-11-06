import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    year: '',
    branch: '',
    division: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/))
      newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirm_password)
      newErrors.confirm_password = 'Confirm Password is required';
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = 'Passwords must match';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.division) newErrors.division = 'Division is required';

    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
        axios.post('http://localhost:4000/api/v1/student/register', formData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    } else {
      // Form has validation errors, prevent submission
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <form style={{margin:'50px 0px'}} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirm_password"
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
              error={errors.confirm_password}
              helperText={errors.confirm_password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              error={errors.year}
              helperText={errors.year}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              error={errors.branch}
              helperText={errors.branch}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Division</InputLabel>
              <Select
                name="division"
                value={formData.division}
                onChange={handleChange}
                error={errors.division}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
              <Typography color="error">{errors.division}</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegistrationForm;
