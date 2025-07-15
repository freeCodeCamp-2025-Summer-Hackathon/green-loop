import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import {
    Typography
} from '@mui/material'


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign in logic here
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <FormWrapper>
            <Typography
              variant="h2"
              color="primary"
              textAlign="center"
              gutterBottom
            >
              Ensemble
            </Typography>
            <Typography
              fontStyle="italic"
              textAlign="center"
              sx={{ fontSize: 20, color: "black", mb: 3 }}
            >
              Login to your account

            </Typography>

              

        </FormWrapper>
    );
};

export default SignIn;