import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import DashNav from "./DashNav";

const groups = false;
function listGroups(groups) {
  if (groups) {
    return (
      <Box>
        <Typography>"Here are your groups"</Typography>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography>"Please join or create a group"</Typography>
      </Box>
    );
  }
}

function Dashboard() {
  return (
    <Container>
      <Box>
        <Typography variant="h2" color="primary" textAlign={"center"}>
          Ensemble
        </Typography>
        <Typography variant="h3">Groups</Typography>
        <DashNav />
        {listGroups()}
      </Box>
    </Container>
  );
}

export default Dashboard;
