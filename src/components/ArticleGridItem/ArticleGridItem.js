import React from "react"
import { Link } from ".."
import "./ArticleGridItem.scss"

const ArticleGridItem = ({ title, url, imageUrl, lang }) => {
  return (
    <article className="article-grid__item">
      <figure>
        <Link to={url ?? "/"} lang={lang}>
          <img
            src={imageUrl}
            alt={title}
            width="100%"
            className="article-grid__item-image"
            loading="lazy"
          />
        </Link>
      </figure>

      <section className="article-grid__item-content">
        <Link to={url ?? "/"} lang={lang}>
          <h3 className="article-grid__item-title">{title}</h3>
        </Link>
      </section>
    </article>
  )
}

export default ArticleGridItem
