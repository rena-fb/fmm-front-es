import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { Link } from ".."

const FooterMenu = ({ lang }) => {
  const [langMenus, setLangMenus] = useState([])

  const menus = useStaticQuery(graphql`
    query {
      header: allWpFmmMenu(
        sort: { fields: fmm_menu___order }

        filter: { fmm_menu: { position: { eq: "footer" } } }
      ) {
        edges {
          node {
            fmm_menu {
              position
              order
            }
            title
            fmmCore {
              languageCode
              frontendSlug
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    const menusList = menus?.header?.edges?.filter(
      item => item?.node?.fmmCore?.languageCode === lang
    )
    setLangMenus(menusList)
  }, [lang, menus])

  return (
    <nav className="footer__nav">
      {langMenus.map((menu, index) => (
        <div key={index}>
          {menu?.node?.fmmCore?.frontendSlug?.includes("http") ? (
            <a
              href={menu?.node?.fmmCore?.frontendSlug}
              target="_blank"
              rel="noreferrer"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: menu?.node?.title,
                }}
              />
            </a>
          ) : menu?.node?.fmmCore?.frontendSlug?.includes("mailto") ? (
            <a href={menu?.node?.fmmCore?.frontendSlug}>
              <span
                dangerouslySetInnerHTML={{
                  __html: menu?.node?.title,
                }}
              />
            </a>
          ) : (
            <Link to={menu?.node?.fmmCore?.frontendSlug} lang={lang}>
              <span
                dangerouslySetInnerHTML={{
                  __html: menu?.node?.title,
                }}
              />
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default FooterMenu
