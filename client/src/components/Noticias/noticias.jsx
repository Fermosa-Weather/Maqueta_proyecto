// client/src/components/Noticias/noticias.jsx
import React, { useState, useEffect } from "react";
import "../../../src/stilos/NewsWidget.css";

export const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/news")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error al obtener los artículos:", error);
      });
  }, []);

  const placeholderImage =
    "https://www.noticiasformosa.com.ar/wp-content/themes/jnews/assets/img/jeg-empty.png";

  return (
    <div className="news-widget">
      <h2 className="news-title">Noticias sobre el Clima en Formosa</h2>
      <div className="news-grid">
        {articles.length > 0 && (
          <>
            {/* Tarjeta de la noticia principal */}
            <div className="news-card main-news-card">
              <a
                href={articles[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                {articles[0].image && articles[0].image !== placeholderImage ? (
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="news-image"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/300")
                    }
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Imagen no disponible"
                    className="news-image"
                  />
                )}
                <div className="news-content">
                  <h3 className="news-card-title">{articles[0].title}</h3>
                  <p className="news-description">{articles[0].description}</p>
                </div>
              </a>
            </div>

            {/* Tarjetas de noticias secundarias */}
            {articles.slice(1).map((article, index) => (
              <div key={index} className="news-card">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  {article.image && article.image !== placeholderImage ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="news-image"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Imagen no disponible"
                      className="news-image"
                    />
                  )}
                  <div className="news-content">
                    <h3 className="news-card-title">{article.title}</h3>
                    <p className="news-description">{article.description}</p>
                  </div>
                </a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
