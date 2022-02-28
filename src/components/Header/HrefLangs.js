import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

const HrefLangs = ({ languages, slug }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  return (
    <Helmet>
      {languages?.reverse()?.map(lang => (
        <link
          rel="alternate"
          hreflang={lang?.node?.fmmCore?.languageCode}
          href={`${site?.siteMetadata?.siteUrl}${
            lang?.node?.fmmCore?.languageCode === "en"
              ? ""
              : `/${lang?.node?.fmmCore?.languageCode}`
          }${
            slug === "/" && lang?.node?.fmmCore?.languageCode === "en"
              ? ""
              : slug
          }`}
        />
      ))}
    </Helmet>
  )
}

export default HrefLangs
