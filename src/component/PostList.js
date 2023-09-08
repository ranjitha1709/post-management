import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [deleteQueue, setDeleteQueue] = useState([]);
  const [queuedCount, setQueuedCount] = useState(0); // Indicator for queued items

  // Load the delete queue from localStorage on initial render
  useEffect(() => {
    const savedQueue = localStorage.getItem('deleteQueue');
    if (savedQueue) {
      setDeleteQueue(JSON.parse(savedQueue));
    }
  }, []);

  // Handle deletion of posts in the queue
  const processDeleteQueue = () => {
    deleteQueue.forEach((postId) => {
      // Send DELETE request for each post in the queue
      fetch(`'https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      }).then(() => {
        // Remove the deleted post from the list
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        // Update the queued count and remove the processed item from the queue
        setQueuedCount((prevCount) => prevCount - 1);
        setDeleteQueue((prevQueue) => prevQueue.filter((id) => id !== postId));
      });
    });

    // Clear the delete queue and its indicator
    setDeleteQueue([]);
    setQueuedCount(0);

    // Save the empty queue to localStorage
    localStorage.removeItem('deleteQueue');
  };

  useEffect(() => {
    // Update the indicator when the queue changes
    setQueuedCount(deleteQueue.length);
    // Save the updated queue to localStorage
    localStorage.setItem('deleteQueue', JSON.stringify(deleteQueue));
  }, [deleteQueue]);

  useEffect(() => {
    // Fetch posts on component mount
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = (postId) => {
    // Add the post to the delete queue
    setDeleteQueue([...deleteQueue, postId]);
  };

  return (
    <div>
      <button onClick={processDeleteQueue}>Delete Queue {queuedCount}</button>
      {posts.map((post) => (
        <Card key={post.id} style={{ margin: '10px' }}>
          <CardContent>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Button onClick={() => handleDelete(post.id)} variant="outlined" color="error">
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PostList;
