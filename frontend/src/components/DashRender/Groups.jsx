import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";

function Groups() {
  const cardData = [
    { id: 1, name: "Group 1", description: "Math Class review", tags: "math", owner_id: 10 },
    { id: 2, name: "Group 2", description: "English Class review", tags: "english", owner_id: 11 },
    { id: 3, name: "Group 3", description: "Chemistry", tags: "chemistry", owner_id: 11 },
    { id: 24, name: "Group 4", description: "Spanish", tags: "spanish", owner_id: 11 },
    { id: 20, name: "Group 5", description: "Psychology", tags: "psychology", owner_id: 11 },
  ];

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Your Groups
      </Typography>

      <Grid container spacing={3}>
        {cardData.map(({ id, name, description, tags, owner_id }) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={id}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                  {name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
                  {description}
                </Typography>

                <Chip
                  label={tags}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                />
              </Stack>

              <Typography variant="caption" color="text.secondary" mt={2}>
                Created by User #{owner_id}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Groups;
