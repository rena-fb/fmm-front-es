import React from "react"
import { Link } from ".."
import GenericBlog from "../../images/generic-blog.svg"
import { truncateExcerpt } from "../../lib/utils"
import "./ArticleListItem.scss"

const ArticleListItem = ({ title, excerpt, date, url, imageUrl, lang }) => {
  return (
    <article className={`article-list__item ${lang === "en" ? "en" : ""}`}>
      <figure>
        <Link to={url} lang={lang}>
          <img
            src={imageUrl ?? GenericBlog}
            alt={title}
            width="100%"
            className="article-list__item-image"
            loading="lazy"
          />
        </Link>
      </figure>

      <section className="article-list__item-content">
        <Link to={url} lang={lang}>
          <h3 className="article-list__item-title">{title}</h3>
        </Link>
        <section
          dangerouslySetInnerHTML={{ __html: truncateExcerpt(excerpt) }}
        />

        <time dateTime={date} className="article-list__item-date">
          {date}
        </time>
      </section>
    </article>
  )
}

export default ArticleListItem
