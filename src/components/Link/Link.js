import { Link as GatsbyLink } from "gatsby"
import React from "react"

const Link = ({ to, lang, children, ...restProps }) => {
  return (
    <GatsbyLink
      to={`${lang && lang !== "es" ? `/${lang}` : ""}${to}`}
      {...restProps}
    >
      {children}
    </GatsbyLink>
  )
}

export default Link
