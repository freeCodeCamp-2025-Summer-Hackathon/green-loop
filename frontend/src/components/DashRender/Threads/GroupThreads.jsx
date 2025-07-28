import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  ListItemButton,
  List,
  Paper,
  Divider,
  useTheme,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";

function Threads({ group_slug }) {
  const { enqueueSnackbar } = useSnackbar();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const theme = useTheme();

  const fetchThreads = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/group/thread/${group_slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch threads: ${response.statusText}`);
      }

      const data = await response.json();
      setThreads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [group_slug]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleSelect = (id) => {
    setSelectedThreadId(id === selectedThreadId ? null : id);
    setNewComment("");
  };

  const handleCreateThread = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenCreateDialog(false);
    setNewTitle("");
    setNewContent("");
  };

  const handleSubmitThread = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        "http://localhost:8000/api/group/thread/create_thread",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newTitle,
            content: newContent,
            group_slug: group_slug,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Create failed with status ${response.status}`);
      }

      const data = await response.json();
      enqueueSnackbar(data.detail, { variant: "success" });
      await fetchThreads();
      handleCloseDialog();
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to create thread", {
        variant: "error",
      });
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://localhost:8000/api/group/thread/create_comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            thread_id: selectedThreadId,
            content: newComment.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to post comment: ${response.statusText}`);
      }

      await fetchThreads(); // Refresh threads to include new comment
      enqueueSnackbar("Comment posted!", { variant: "success" });
      setNewComment("");
    } catch (err) {
      enqueueSnackbar(err.message || "Failed to post comment", {
        variant: "error",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        spacing={2}
        flexWrap="wrap"
      >
        <Typography variant="h4" fontWeight={600}>
          Discussion Threads
        </Typography>

        <Box display="flex" gap={1}>
          <Button variant="outlined" color="success" onClick={handleCreateThread}>
            Create Thread
          </Button>
        </Box>
      </Stack>

      <List component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        {threads.length === 0 && (
          <Typography align="center" p={3} color="text.secondary">
            No threads found.
          </Typography>
        )}

        {threads.map((thread) => (
          <Box key={thread.id}>
            <ListItemButton
              selected={thread.id === selectedThreadId}
              onClick={() => handleSelect(thread.id)}
              sx={{
                bgcolor:
                  thread.id === selectedThreadId
                    ? "rgba(56, 142, 60, 0.15)"
                    : "white",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                transition: "0.2s",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, fontSize: "1.1rem", px: 2 }}
              >
                {thread.title}
              </Typography>
            </ListItemButton>

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
                  Content:
                </Typography>
                <Typography variant="body1" mb={1}>
                  {thread.content}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  mb={2}
                  display="block"
                >
                  Created at:{" "}
                  {thread.created_at
                    ? new Date(thread.created_at).toLocaleString()
                    : "Unknown"}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={1}
                  color="success.dark"
                >
                  Comments:
                </Typography>
                <Divider />

                {thread.thread_comments && thread.thread_comments.length > 0 ? (
                  thread.thread_comments.map((comment) => (
                    <Box key={comment.id} mt={1.5}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: theme.palette.success.main,
                        }}
                      >
                        User:{" "}
                        {comment.username
                          ? comment.username + "#" + comment.user_id
                          : "Unknown"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {comment.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {comment.created_at
                          ? new Date(comment.created_at).toLocaleString()
                          : ""}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    No comments yet.
                  </Typography>
                )}

                {/* Comment form */}
                <Box mt={3}>
                  <TextField
                    label="Add a comment"
                    multiline
                    fullWidth
                    minRows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isSubmittingComment}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleCommentSubmit}
                    disabled={isSubmittingComment || !newComment.trim()}
                  >
                    {isSubmittingComment ? "Posting..." : "Comment"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </List>

      {/* Create Thread Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Thread</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Thread Title"
            margin="normal"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Content"
            margin="normal"
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmitThread} variant="contained" color="primary">
            Create Thread
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Threads;
