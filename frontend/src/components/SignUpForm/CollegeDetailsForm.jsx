import React from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";


import {useContext} from 'react';
import SignUpContext from '../../context/SignUpContext';

export default function CollegeDetailsFormData() {
  const {collegeDetailsFormData, handleFormChange, errors} = useContext(SignUpContext)


  return (
    <Box component="form" noValidate sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="University"
        name="college"
        value={collegeDetailsFormData.college || ""}
        onChange={handleFormChange}
        error={Boolean(errors.college)}
        helperText={errors.college}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Field of Study"
        name="major"
        value={collegeDetailsFormData.major || ""}
        onChange={handleFormChange}
        error={Boolean(errors.major)}
        helperText={errors.major}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Academic Year"
        name="collegeYear"
        value={collegeDetailsFormData.collegeYear || ""}
        onChange={handleFormChange}
        error={Boolean(errors.collegeYear)}
        helperText={errors.collegeYear}
        margin="normal"
      />
    </Box>
  );
}
