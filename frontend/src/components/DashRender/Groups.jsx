import React from "react";
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Toolbar,
  Grid,
  Paper,
} from "@mui/material";

function Groups() {
  //Create logic for running through group lists and rendering as cards per our Figma layout.

  //render conditionally if the user has no groups. add button to create or join groups
  const cardData = [
    {
      id: 1,
      name: "Group 1",
      description: "Math Class review",
      tags: "math",
      owner_id: 10,
    },

    {
      id: 2,
      name: "Group 2",
      description: "English Class review",
      tags: "english",
      owner_id: 11,
    },

    {
      id: 3,
      name: "Group 3",
      description: "Chemistry",
      tags: "chemistry",
      owner_id: 11,
    },

    {
      id: 24,
      name: "Group 4",
      description: "Spanish",
      tags: "spanish",
      owner_id: 11,
    },

    {
      id: 20,
      name: "Group Blue ",
      description: "Psychology",
      tags: "psychology",
      owner_id: 11,
    },
  ];

  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper
            elevation={3}
            style={{
              padding: "1rem",
              textAlign: "center",
              maxWidth: "150px",
              maxHeight: "200px",
            }}
          >
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <p>Created By:{card.owner_id}</p>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default Groups;

