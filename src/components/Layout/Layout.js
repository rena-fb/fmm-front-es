/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import PropTypes from "prop-types"
import React, { useState } from "react"
import { Footer, Header } from "../"
import "./Layout.scss"

const Layout = ({ lang, children, languages, copyrightMessage, className, slug }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <section
      style={mobileMenuOpen ? { overflow: "hidden", height: "100vh" } : {}}
      className={`${className} ${lang}`}
    >
      <Header
        lang={lang}
        languages={languages}
        mobileTrigger={setMobileMenuOpen}
        copyrightMessage={copyrightMessage}
        slug={slug}
      />

      <main id="main">{children}</main>

      <Footer
        lang={lang}
        languages={languages}
        copyrightMessage={copyrightMessage}
      />
    </section>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
