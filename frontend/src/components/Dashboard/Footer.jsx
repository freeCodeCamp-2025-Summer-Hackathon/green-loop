import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderTop: '1px solid #ddd',
        maxWidth: 600,
        margin: '0 auto',
        mt: 'auto', // Optional: push footer to bottom if using flex layout
      }}
    >
      <Link href="../AboutUs" underline="hover" color="text.secondary"> {/*the href links will be decided on later*/}
        About Us
      </Link>

      <Link href="../ContactUs" underline="hover" color="text.secondary">
        Contact Us
      </Link>

      <Typography variant="body2" color="text.secondary">
        © {currentYear} Ensemble
      </Typography>
    </Box>
  );
};

export default Footer;