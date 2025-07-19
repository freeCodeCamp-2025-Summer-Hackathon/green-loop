import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormWrapper from "./FormWrapper";

function ContactUs() {
  return (
    <div>
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              component={Link}
              to="/"
              size="large"
              color="black"
              sx={{ padding: 0, mr: 1 }}
            >
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            Ensemble
          </Typography>
        </Box>
      <FormWrapper>
        <Box
        sx={{
          display: 'flex',      
          justifyContent:'center',
          alignItems:'flex-start',
          margin: '0 auto'
        }}
        >
          <div>
            <Typography variant="h3">
              <p>Contact Us</p>
            </Typography>
            <Typography variant="h6">
              <p>You can reach us through our Discord users.</p>
            </Typography>
            <Typography variant="h5" component="div">
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                <li> @finianknepper </li>
                <li> @Wayloe </li>
                <li> @Itnerd </li>
                <li> @sn0wier </li>
                <li> @dohaderlie </li>
                <li> @jjotteson1 </li>
                <li> @abego2018 </li>
                <li> @bro9872. </li>
              </ul>
              </Typography>
            </div>
          </Box>
        </FormWrapper>
    </div>
  );
};

export default ContactUs;