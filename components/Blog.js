import React from 'react';

function Blog({ blog }) {
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
        </div>
    );
}

export default Blog;
