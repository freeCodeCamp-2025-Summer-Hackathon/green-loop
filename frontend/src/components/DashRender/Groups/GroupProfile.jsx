import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Paper,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";

function GroupProfile() {
  const { group_slug } = useParams();

  // State for full group data (null initially)
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGroupProfile() {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `http://localhost:8000/api/group/${group_slug}/profile`,
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
        setGroup(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGroupProfile();
  }, [group_slug]);

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
        Error loading group profile: {error}
      </Typography>
    );
  }

  if (!group) {
    return null; // or a fallback UI
  }

  const {
    name,
    description,
    tags,
    owner_username,
    owner_email,
    created_at,
    visibility,
    total_members,
    members,
  } = group;

  const formattedCreatedDate = new Date(created_at).toLocaleDateString();

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif", mt: 5, px: 3, maxWidth: 900, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          🧑‍🤝‍🧑 {name}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Created on {formattedCreatedDate} &bull; Visibility: {visibility.toUpperCase()} &bull;{" "}
          {total_members} Member{total_members !== 1 ? "s" : ""}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {description}
        </Typography>

        {tags && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Tags
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 3 }}>
              {tags.split(",").map((tag, idx) => (
                <Chip key={idx} label={tag.trim()} variant="outlined" />
              ))}
            </Stack>
          </>
        )}

        <Divider sx={{ mb: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Group Owner
        </Typography>
        <Typography gutterBottom>
          {owner_username} 
        </Typography>
      </Paper>

      <Typography variant="h4" fontWeight={600} gutterBottom>
        Group Members
      </Typography>

      <Grid container spacing={4}>
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.email}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s ease",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar>{member.username[0].toUpperCase()}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {member.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Role: {member.role} &nbsp;|&nbsp; Joined:{" "}
                      {new Date(member.joined_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GroupProfile;
