import React, { useState, useEffect } from 'react';
import PostList from './component/PostList';
import PostDialog from './component/PostDialog';
import SearchBar from './component/SearchBar';
import RefreshButton from './component/RefreshButton';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine';
import yourTheme from './yourTheme'; // Import your custom theme

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Define a placeholder for the 'posts' array
  const [posts, setPosts] = useState([]);

  // Load the search term from localStorage on initial render
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  // Handle search term changes
  const handleSearch = (term) => {
    setSearchTerm(term);

    // Filter posts based on search term
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredPosts);

    // Save the search term to localStorage
    localStorage.setItem('searchTerm', term);
  };

  // Handle the "Refresh State" button click
  const handleRefresh = () => {
    // Clear the search term and results
    setSearchTerm('');
    setSearchResults([]);

    // Clear the saved search term from localStorage
    localStorage.removeItem('searchTerm');

    // Fetch posts again
    fetchPosts();
  };

  // Define a placeholder for the 'fetchPosts' function
  const fetchPosts = () => {
    // Fetch posts and set the 'posts' state
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    // Fetch posts on component mount
    fetchPosts();
  }, []); // Empty dependency array to fetch posts only once

  return (
    <StyledEngineProvider injectFirst>
  <ThemeProvider theme={yourTheme}>
    <CssBaseline />
    <div>
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      <RefreshButton onRefresh={handleRefresh} />
      {searchResults.length > 0 ? (
        <PostList posts={searchResults} onPostClick={setSelectedPostId} />
      ) : (
        <PostList posts={posts} onPostClick={setSelectedPostId} />
      )}
      <PostDialog
        postId={selectedPostId}
        open={!!selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />
        </div>
        </ThemeProvider>
</StyledEngineProvider>
  );
}

export default App;

