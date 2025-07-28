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
import { useNavigate } from "react-router-dom";

function UserGroups() {
  const [ownedGroups, setOwnedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOwnedGroups() {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          "http://localhost:8000/api/group/my_groups_owned",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOwnedGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOwnedGroups();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 6 }}>
        Error loading your groups: {error}
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
        Groups You Own
      </Typography>

      {ownedGroups.length === 0 ? (
        <Typography color="text.secondary" align="center">
          You haven’t created any groups yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {ownedGroups.map(
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
                  onClick={() =>
                    navigate(`/groups/${slug}`, {
                      state: {
                        slug,
                        name,
                        description,
                        tags,
                        owner_username,
                        total_members,
                        visibility,
                      },
                    })
                  }
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
                    <Typography variant="caption" color="text.secondary">
                      Group Code:{" "}
                      <span style={{ fontWeight: "bold" }}>{slug}</span>
                    </Typography>
                    {tags && (
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {tags.split(",").map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag.trim()}
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{
                              maxWidth: "120px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Stack>

                  <Typography variant="caption" color="text.secondary" mt={2}>
                    Members: {total_members} | {visibility}
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

export default UserGroups;
