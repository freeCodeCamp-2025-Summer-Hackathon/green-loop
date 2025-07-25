import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  ListItemButton,
  List,
  Paper,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";

const threadsArray = [
  {
    id: 1,
    title: "Thread 1 - Study group 3",
    content: "This is my thread",
    group_id: "group1",
    group_slug: "english",
    user_id: 3,
    comments: [
      { username: "jane_doe", college: "NYU", message: "Great post! Want more info" },
      { username: "mike21", college: "UCLA", message: "I don't know about that. Check your info" },
    ],
  },
  {
    id: 2,
    title: "Thread 2 - Study group Test",
    content: "This is my other thread",
    group_id: "group2",
    group_slug: "english",
    user_id: 3,
    comments: [
      { username: "sarah_b", college: "Columbia", message: "Helpful insights!" },
      { username: "tobi_e", college: "UT Austin", message: "Can you expand on this?" },
    ],
  },
  {
    id: 3,
    title: "Thread 3 - Test prep",
    content: "This is his thread",
    group_id: "group1",
    group_slug: "math",
    user_id: 3,
    comments: [
      { username: "leonardM", college: "MIT", message: "I totally agree!" },
      { username: "keishaQ", college: "Stanford", message: "Need more explanation here." },
    ],
  },
  {
    id: 4,
    title: "Thread 4 - Review for Friday",
    content: "This is someone else's thread",
    group_id: "group3",
    group_slug: "math",
    user_id: 3,
    comments: [],
  },
];

function Threads() {
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const theme = useTheme();

  const handleSelect = (id) => {
    setSelectedThreadId(id === selectedThreadId ? null : id);
  };

  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={600}>
          Discussion Threads
        </Typography>
        <Box display="flex" gap={1}>
          <TextField size="small" placeholder="Search..." />
          <Button variant="contained">Search</Button>
        </Box>
      </Box>

      <List component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        {threadsArray.map((thread) => (
          <Box key={thread.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={thread.id === selectedThreadId}
                onClick={() => handleSelect(thread.id)}
                sx={{
                  bgcolor:
                    thread.id === selectedThreadId ? "rgba(56, 142, 60, 0.15)" : "white",
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={thread.title}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>

            {selectedThreadId === thread.id && (
              <Box
                px={3}
                py={2}
                mx={2}
                mb={2}
                borderRadius={2}
                bgcolor="#f4fdf4"
                boxShadow={1}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={1}
                  color="success.dark"
                >
                  Comments:
                </Typography>
                <Divider />
                {thread.comments.length > 0 ? (
                  thread.comments.map((comment, index) => (
                    <Box key={index} mt={1.5}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: theme.palette.success.main }}
                      >
                        {comment.username} | {comment.college}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {comment.message}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    No comments yet.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default Threads;
