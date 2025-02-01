import React, { useState, useEffect } from 'react';
import { fetchCyberSecurityNews } from '../services/newsService';
import './Article.css';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newsArticles = await fetchCyberSecurityNews();
        setArticles(newsArticles);
      } catch (err) {
        setError('Failed to load news articles. Please try again later.');
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="article-container">
        <h1 className="article-title">Articles</h1>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-container">
        <h1 className="article-title">Articles</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="article-container">
      <h1 className="article-title">Articles</h1>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.urlToImage && (
              <div className="article-image">
                <img src={article.urlToImage} alt={article.title} />
              </div>
            )}
            <div className="article-content">
              <h2 className="article-headline">{article.title}</h2>
              <p className="article-description">{article.description}</p>
              <div className="article-meta">
                <span className="article-source">{article.source.name}</span>
                <span className="article-date">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-more-button"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
