import { graphql, useStaticQuery } from "gatsby"
import { useEffect, useState } from "react"

const useCountriesInLanguage = (lang)=> {
 const { allWpPage } = useStaticQuery(
    graphql`
      query {
        allWpPage(
          filter: { fmmCore: { frontendSlug: { glob: "/contraception-in*" } } }
        ) {
          edges {
            node {
              id
              title
              fmmCore {
                languageCode
                frontendSlug
              }
            }
          }
        }
      }
    `
  )

  const [countriesInLanguage, setCountriesInLanguage] = useState([])

   useEffect(() => {
    const countriesInLanguage = []

    allWpPage?.edges?.filter(
      countryPage =>
        countryPage?.node?.fmmCore?.languageCode === lang &&
        countriesInLanguage?.push(countryPage?.node?.fmmCore?.frontendSlug)
    )

    setCountriesInLanguage(countriesInLanguage)
  }, [allWpPage?.edges, lang])

  return countriesInLanguage;
}

export default useCountriesInLanguage