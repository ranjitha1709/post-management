import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function PostDialog({ postId, open, onClose }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (open) {
      // Fetch comments for the selected post
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    }
  }, [postId, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {comments.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default PostDialog;
