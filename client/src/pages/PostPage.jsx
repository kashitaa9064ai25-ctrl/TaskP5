import React, { useState } from 'react';
import './PostPage.css';

export default function PostPage() {
  const [postType, setPostType] = useState('question');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    abstract: '',
    articleText: '',
    tags: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateAndPost = (e) => {
    e.preventDefault();


    if (!formData.title.trim()) {
      setError('Please provide a title.');
      alert('Error: Please provide a title.');
      return;
    }

    if (postType === 'question') {
      if (!formData.description.trim()) {
        setError('Please describe your problem.');
        alert('Error: Please describe your problem.');
        return;
      }
    } else {
      if (!formData.abstract.trim()) {
        setError('Please provide an abstract.');
        alert('Error: Please provide an abstract.');
        return;
      }
      if (!formData.articleText.trim()) {
        setError('Please provide article content.');
        alert('Error: Please provide article content.');
        return;
      }
    }


    if (!formData.tags.trim()) {
      setError('Please add at least 1 tag.');
      alert('Error: Please enter at least 1 tag.');
      return;
    }

    const tagList = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (tagList.length > 3) {
      setError('You can add up to 3 tags only (comma separated).');
      alert('Error: You can add up to 3 tags only.');
      return;
    }


    alert(`Success: Your ${postType === 'question' ? 'Question' : 'Article'} has been posted successfully!`);

    setFormData({
      title: '',
      description: '',
      abstract: '',
      articleText: '',
      tags: ''
    });
    setError('');
  };

  return (
    <div className="post-container">
      <div className="post-header-box">
        <h2>New Post</h2>
      </div>

      <form onSubmit={validateAndPost} className="post-form">
        {/* Post Type Selector */}
        <div className="post-type-row">
          <span className="post-type-label">Select Post Type:</span>
          <label className="radio-label">
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === 'question'}
              onChange={() => {
                setPostType('question');
                setError('');
              }}
            />
            Question
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === 'article'}
              onChange={() => {
                setPostType('article');
                setError('');
              }}
            />
            Article
          </label>
        </div>

        <div className="section-description-box">
          <p>What do you want to ask or share</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {postType === 'question' ? (
          <div className="conditional-fields">

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Start your question with how, what, why, etc."
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Describe your problem</label>
              <textarea
                name="description"
                rows="6"
                placeholder="Describe your problem in detail..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="conditional-fields">

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a descriptive title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Abstract</label>
              <textarea
                name="abstract"
                rows="3"
                placeholder="Enter a 1-paragraph abstract"
                value={formData.abstract}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Article Text</label>
              <textarea
                name="articleText"
                rows="8"
                placeholder="Enter a 1-paragraph abstract"
                value={formData.articleText}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            placeholder={
              postType === 'question'
                ? 'Please add up to 3 tags to describe what your question is about e.g., Java'
                : 'Please add up to 3 tags to describe what your article is about e.g., Java'
            }
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="post-button-container">
          <button type="submit" className="post-btn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}