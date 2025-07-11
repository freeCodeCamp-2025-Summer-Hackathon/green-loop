import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";


import { useContext } from "react";
import SignUpContext from "../../context/SignUpContext";


const PersonalDetailsForm = () => {
    const {personalFormData, errors, handleFormChange} = useContext(SignUpContext)







    return (
        <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={personalFormData.email || ""}
                onChange={handleFormChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Username"
                name="username"
                value={personalFormData.username || ""}
                onChange={handleFormChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={personalFormData.password || ""}
                onChange={handleFormChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={personalFormData.confirmPassword || ""}
                onChange={handleFormChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                margin="normal"
            />
        </Box>
    );
};

export default PersonalDetailsForm;
