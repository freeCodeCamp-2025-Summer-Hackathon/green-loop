import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";

function GroupProfile() {
  const { group_slug } = useParams();
  const [members, setMembers] = useState([]);
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
        setMembers(data.members);
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
        Error loading group members: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif", mt: 5, px: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Group Members
      </Typography>

      <Grid container spacing={4}>
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.user_id}>
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
                      Joined: {new Date(member.joined_at).toLocaleDateString()}
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
