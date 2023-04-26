import React, { useState, useEffect } from "react";
import $ from "jquery";

function Nav() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await $.getJSON(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd76fdf160604599a41f0d9b3137680d"
        );
        setNews(response.articles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();

    const interval = setInterval(fetchNews, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      <div className="news">
        <h3>Latest News Headlines</h3>
        <ul>
          {news.slice(0, 5).map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
