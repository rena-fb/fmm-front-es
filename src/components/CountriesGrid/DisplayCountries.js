import React, { Fragment } from "react"
import { Link } from ".."
import useCountriesInLanguage from "../../hooks/useCountriesInLanguage"
import "./CountriesGrid.scss"

const DisplayCountries = ({ lang, countries }) => {
  const countriesToShow = useCountriesInLanguage(lang)

  return (
    <ul className={`countries-grid ${lang}`}>
      {countries.map((item, index) => (
        <Fragment key={index}>
          {(countriesToShow?.includes(item?.link) ||
            countriesToShow?.includes(`${item?.link}/`)) && (
            <li className={item.continent.toLowerCase()}>
              <Link lang={lang} to={`${item.link}`}>
                <img
                  src={`${item.image}`}
                  height="30px"
                  width="30px"
                  loading="lazy"
                  alt={`${item.label}`}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  )
}

export default DisplayCountries
