import React from "react"
import { Button } from "reactstrap"
import { Link } from ".."
import "./Method.scss"

const Method = ({
  title,
  excerpt,
  frontendSlug,
  imageUrl,
  method,
  disableCompare,
  lang,
  compareMethod,
  exploreButton,
  compareButton,
}) => {
  return (
    <section className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
      <section className="method">
        <figure className="method__icon">
          <img src={imageUrl} alt="" loading="lazy" />
        </figure>
        <h3 className="method__title">{title}</h3>
        <p className="method__excerpt">{excerpt}</p>
        <Link
          to={frontendSlug}
          lang={lang}
          className="button button--secondary"
        >
          {exploreButton}
        </Link>

        <Button
          onClick={() => compareMethod(method)}
          className="button"
          // style={disableCompare ? {pointerEvents: "none", opacity: "0.6"} : {}}
        >
          {compareButton}
        </Button>
      </section>
    </section>
  )
}

export default Method
