import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

function Dashboard() {
  const [withGroups, setWithGroups] = useState(true);

  if (withGroups) {
    return (
      <Container>
        <Box>
          <Typography variant="h2">Ensebmle</Typography>
          <Typography variant="h3">WithGroups</Typography>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container>
        <Box>
          <Typography variant="h2">Ensebmle</Typography>
          <Typography variant="h3">Without groups</Typography>
        </Box>
      </Container>
    );
  }
}
