// src/components/FormWrapper.js
import React from "react";
import { Box, Card, CardContent } from "@mui/material";

const FormWrapper = ({ children }) => {
  return (
    <Box  sx={{ maxWidth: 500, margin: "40px auto" }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
          boxShadow: 3,
        }}
      >
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

export default FormWrapper;
