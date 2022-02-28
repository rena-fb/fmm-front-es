import React from "react"
import { Link } from ".."
import GenericHero from "../../images/hero-generic.svg"
import "./Hero.scss"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import { Button } from "reactstrap"

const Hero = ({
  title,
  intro,
  imageUrl,
  linkUrl,
  linkTitle,
  isHome,
  isBlogPost,
  isFaq,
  slug,
  lang,
  pageContext,
  linkType,
}) => {
  const { breadcrumb } = pageContext || {}

  return (
    <section className={`hero hero--${slug}`}>
      <section className="container">
        <section className="row">
          {isBlogPost && (
            <section className="col-12 hero__content hero__content--blog-post text-center">
              <h1>
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </h1>
              <section className="d-flex justify-content-center w-100">
                <Breadcrumb
                  crumbs={breadcrumb?.crumbs || []}
                  crumbSeparator=" / "
                  crumbLabel={title}
                />
              </section>
            </section>
          )}

          {!isBlogPost && !isFaq && (
            <>
              <section
                className={`col-12 ${
                  isHome ? "col-lg-6" : "col-lg-7"
                } hero__content`}
              >
                <h1>
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </h1>
                <section
                  className="hero__paragraph"
                  dangerouslySetInnerHTML={{ __html: intro }}
                />

                {linkUrl ? (
                  <>
                    {linkType === "function" ? (
                      <Button
                        onClick={linkUrl}
                        className="button button--secondary"
                      >
                        {linkTitle}
                      </Button>
                    ) : linkUrl?.includes("http") ||
                      linkUrl?.includes("https") ? (
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button--secondary"
                      >
                        {linkTitle}
                      </a>
                    ) : (
                      <Link
                        to={linkUrl}
                        lang={lang}
                        className="button button--secondary"
                      >
                        {linkTitle}
                      </Link>
                    )}
                  </>
                ) : (
                  ""
                )}

                {!isHome && (
                  <section className="d-flex justify-content-center justify-content-lg-start w-100">
                    <Breadcrumb
                      crumbs={breadcrumb?.crumbs || []}
                      crumbSeparator=" / "
                      crumbLabel={title}
                    />
                  </section>
                )}
              </section>

              <section
                className={`d-none d-lg-flex ${
                  isHome ? "col-lg-6" : "col-lg-5"
                }`}
              >
                <img src={imageUrl ?? GenericHero} alt={title} loading="lazy" />
              </section>
            </>
          )}
        </section>
      </section>
    </section>
  )
}

export default Hero
