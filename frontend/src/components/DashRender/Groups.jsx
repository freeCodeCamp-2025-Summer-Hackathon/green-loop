import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Chip,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

  function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchGroups() {
      const token = localStorage.getItem("access_token"); // Or use context/store if that's where it's stored

      try {
        const response = await fetch("http://localhost:8000/api/group/my_groups", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGroups();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 6 }}>
        Error loading groups: {error}
      </Typography>
    );
  }

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

      {groups.length === 0 ? (
        <Typography color="text.secondary" align="center">
          You are not a member of any groups yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {groups.map(
            ({
              slug,
              name,
              description,
              tags,
              owner_username,
              total_members,
              visibility,
            }) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={slug}>
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
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight={600}
                      gutterBottom
                    >
                      {name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: 60 }}
                    >
                      {description || "No description"}
                    </Typography>

                    {tags && (
                      <Chip
                        label={tags}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ width: "fit-content" }}
                      />
                    )}
                  </Stack>

                  <Typography variant="caption" color="text.secondary" mt={2}>
                    Created by {owner_username} | Members: {total_members} |{" "}
                    {visibility}
                  </Typography>
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Box>
  );
}

export default Groups;
