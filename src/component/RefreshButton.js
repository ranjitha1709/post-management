import React from 'react';

function RefreshButton({ onRefresh }) {
  return (
    <button onClick={onRefresh}>Refresh State</button>
  );
}

export default RefreshButton;
