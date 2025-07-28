import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: '#c1fad6ff',
        color: 'white',
        py: 2,
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          maxWidth: 1700,
          margin: '0 auto',
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/about" underline="hover" color="text.secondary">
          About Us
        </Link>

        <Link href="/contact" underline="hover" color="text.secondary">
          Contact Us
        </Link>

        <Typography variant="body2" color="text.secondary">
          © {currentYear} Ensemble
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;