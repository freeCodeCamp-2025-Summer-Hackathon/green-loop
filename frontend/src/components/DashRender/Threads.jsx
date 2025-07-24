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
      "Great post! Want more info",
      "I don't know about that. Check your info",
    ],
  },
  {
    id: 2,
    title: "Thread 2 - Study group Test",
    content: "This is my other thread",
    group_id: "group2",
    group_slug: "english",
    user_id: 3,
    comments: ["Helpful insights!", "Can you expand on this?"],
  },
  {
    id: 3,
    title: "Thread 3 - Test prep",
    content: "This is his thread",
    group_id: "group1",
    group_slug: "math",
    user_id: 3,
    comments: ["I totally agree!", "Need more explanation here."],
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

  const handleSelect = (id) => {
    setSelectedThreadId(id === selectedThreadId ? null : id);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        My Threads
      </Typography>

      <List component={Paper}>
        {threadsArray.map((thread) => (
          <Box key={thread.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={thread.id === selectedThreadId}
                onClick={() => handleSelect(thread.id)}
                sx={{
                  bgcolor:
                    thread.id === selectedThreadId ? "lightgreen" : "lightgrey",
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  "&:hover": {
                    bgcolor:
                      thread.id === selectedThreadId
                        ? "primary.main"
                        : "action.hover",
                    color: thread.id === selectedThreadId ? "black" : "inherit",
                  },
                  color: thread.id === selectedThreadId ? "green" : "inherit",
                }}
              >
                <ListItemText primary={thread.title} />
              </ListItemButton>
            </ListItem>

            {/* Render comments directly below selected thread */}
            {selectedThreadId === thread.id && (
              <Box
                pl={4}
                py={1}
                mx={2}
                mt={1}
                borderRadius={1}
                bgcolor="#dedcdcff"
              >
                <Typography variant="subtitle1">Comments:</Typography>
                {thread.comments.length > 0 ? (
                  thread.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" sx={{ mt: 0.5 }}>
                      • {comment}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No comments yet.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        ))}
      </List>

      {/* Optional: Add new thread */}
      <Box mt={4}>
        <TextField fullWidth label="New Thread Title" />
        <Button variant="contained" sx={{ mt: 1 }}>
          Add Thread
        </Button>
      </Box>
    </Box>
  );
}

export default Threads;
