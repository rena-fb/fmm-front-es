import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import DisplayCountries from "./DisplayCountries"

import burkinaFaso from "../../images/flag-burkina-faso.svg"
import coteDivoire from "../../images/flag-cote-divoire.svg"
import ghana from "../../images/flag-ghana.svg"
import india from "../../images/flag-india.svg"
import liberia from "../../images/flag-liberia.svg"
import mali from "../../images/flag-mali.svg"
import mexico from "../../images/flag-mexico.svg"
import nigeria from "../../images/flag-nigeria.svg"
import zambia from "../../images/flag-zambia.svg"


const CountryData = {
  "burkina-faso": {
    link: "/contraception-in-burkina-faso",
    image: burkinaFaso,
    label: "Burkina Faso",
    continent: "Africa",
  },
  "cote-divoire": {
    link: "/contraception-in-cote-divoire",
    image: coteDivoire,
    label: "Côte d'ivoire",
    continent: "Africa",
  },
  ghana: {
    link: "/contraception-in-ghana",
    image: ghana,
    label: "Ghana",
    continent: "Africa",
  },
  india: {
    link: "/contraception-in-india",
    image: india,
    label: "India",
    continent: "Asia",
  },
  liberia: {
    link: "/contraception-in-liberia",
    image: liberia,
    label: "Liberia",
    continent: "Africa",
  },
  mali: {
    link: "/contraception-in-mali",
    image: mali,
    label: "Mali",
    continent: "Africa",
  },
  mexico: {
    link: "/contraception-in-mexico",
    image: mexico,
    label: "Mexico",
    continent: "America",
  },
  nigeria: {
    link: "/contraception-in-nigeria",
    image: nigeria,
    label: "Nigeria",
    continent: "Africa",
  },
  zambia: {
    link: "/contraception-in-zambia",
    image: zambia,
    label: "Zambia",
    continent: "Africa",
  },
}

const CountriesGrid = ({ lang }) => {
  const { allWpCountryProfile } = useStaticQuery(
    graphql`
      query {
        allWpCountryProfile {
          nodes {
            country_profile_data {
              country
            }
            fmmCore {
              languageCode
            }
          }
        }
      }
    `
  )

  let uniqueCountries = new Set()

  allWpCountryProfile.nodes.forEach(item => {
    uniqueCountries.add(item.country_profile_data.country)
  })

  let countries = []

  uniqueCountries.forEach(item => {
    if (item) {
      countries.push(CountryData[item])
    }
  })

  return <DisplayCountries lang={lang} countries={countries}></DisplayCountries>
}

export default CountriesGrid
