import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { CountriesGrid, Link } from ".."
import useCountriesInLanguage from "../../hooks/useCountriesInLanguage"

const HeaderMenu = ({ lang }) => {
  const [langMenus, setLangMenus] = useState([])
  const countriesInLanguage = useCountriesInLanguage(lang)

  const { header } = useStaticQuery(graphql`
    query {
      header: allWpFmmMenu(
        sort: { fields: fmm_menu___order }

        filter: { fmm_menu: { position: { eq: "header" } } }
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
    const menusList = header?.edges?.filter(
      item => item?.node?.fmmCore?.languageCode === lang
    )

    setLangMenus(menusList)
  }, [lang, header])

  return (
    <>
      <Link
        to={langMenus[0]?.node?.fmmCore?.frontendSlug}
        lang={lang}
        activeClassName="active"
      >
        <span dangerouslySetInnerHTML={{ __html: langMenus[0]?.node?.title }} />
      </Link>

      {countriesInLanguage.length >= 1 && (
        <UncontrolledDropdown>
          <DropdownToggle className="button--link">
            <span
              dangerouslySetInnerHTML={{ __html: langMenus[1]?.node?.title }}
            />
          </DropdownToggle>

          <DropdownMenu className="country-dropdown">
            <CountriesGrid lang={lang} />
          </DropdownMenu>
        </UncontrolledDropdown>
      )}

      <Link
        to={langMenus[2]?.node?.fmmCore?.frontendSlug}
        lang={lang}
        activeClassName="active"
      >
        <span dangerouslySetInnerHTML={{ __html: langMenus[2]?.node?.title }} />
      </Link>

      <a
        href={langMenus[3]?.node?.fmmCore?.frontendSlug}
        target="_blank"
        rel="noreferrer"
      >
        <span dangerouslySetInnerHTML={{ __html: langMenus[3]?.node?.title }} />
      </a>
    </>
  )
}

export default HeaderMenu
