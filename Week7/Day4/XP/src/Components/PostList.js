// src/Components/PostList.js
import React from 'react';
import posts from '../data/posts.json';

function PostList() {
  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;