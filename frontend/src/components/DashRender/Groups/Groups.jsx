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

function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGroups() {
      const token = localStorage.getItem("access_token");

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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
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
    <Box sx={{ fontFamily: "'Inter', sans-serif", mt: 5 }}>
      {groups.length === 0 ? (
        <div>
          <Typography color="text.secondary" align="center">
          You are not a member of any groups yet.
        </Typography>
        <Typography align="center" color="text.secondary">
         <i> Create or Join a group</i>
        </Typography>
        </div>
      ) : (
        <>
          <Typography
            variant="h5"
            fontWeight={600}
            align="center"
            gutterBottom
            color="primary"
            sx={{ mb: 4 }}
          >
            Your Groups
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              container
              spacing={4}
              sx={{ maxWidth: "1000px", justifyContent: "center" }}
            >
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
                  <Grid item xs={12} sm={6} key={slug}>
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
                      elevation={5}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        minHeight: 260,
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
                        <Typography variant="h6" fontWeight={600} gutterBottom>
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
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        mt={2}
                      >
                        Created by {owner_username} | Members: {total_members} |{" "}
                        {visibility}
                      </Typography>
                    </Paper>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Groups;
