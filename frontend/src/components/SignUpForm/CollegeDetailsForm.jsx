import React from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
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
     
      <FormControl fullWidth margin="normal">
        <InputLabel id="collegeYear-label">Academic Year</InputLabel>
        <Select
          labelId="collegeYear-label"
          id="collegeYear"
          name="collegeYear"
          value={collegeDetailsFormData.collegeYear || ""}
          onChange={handleFormChange}
          label="Academic Year" // important for floating label to work
        >
          <MenuItem value="freshman">Freshman</MenuItem>
          <MenuItem value="sophomore">Sophomore</MenuItem>
          <MenuItem value="junior">Junior</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
          <MenuItem value='notApplicable'> N/A </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
