import { navigate } from "gatsby-link"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { Button, Col, Container, Modal, ModalBody } from "reactstrap"
import { Link, SocialIcons } from ".."
import isoLanguage from "../../data/languages"
import FMMLogoMobile from "../../images/fmm-logo-es-mobile.svg"
import FMMLogo from "../../images/fmm-logo-es.svg"
import HamburgerCloseIcon from "../../images/hamburger-close-icon.svg"
import HamburgerIcon from "../../images/hamburger-icon.svg"
import LanguageIconColored from "../../images/language-icon-colored.svg"
import LanguageIcon from "../../images/language-icon.svg"
import "./Header.scss"
import HeaderMenu from "./HeaderMenu"
import HrefLangs from "./HrefLangs"

const Header = ({ lang, languages, mobileTrigger, slug }) => {
  const [languageModal, setLanguageModal] = useState(false)
  const [menuModal, setMenuModal] = useState(false)
  const [selectedLanguageName, setSelectedLanguageName] = useState(lang)
  const [pageLanguages, setPageLanguages] = useState([])
  const [pagePathArray, setPagePathArray] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPagePathArray(window?.location.pathname?.substring(1).split("/"))
    } else {
      setPagePathArray("/")
    }
  }, [])

  useEffect(() => {
    mobileTrigger(menuModal)
  }, [menuModal, mobileTrigger])

  const navigateToSelectedPath = value => {
    if (value === "en") {
      navigate(`/${pagePathArray.join(`/`)}`)
    } else {
      navigate(`/${value}/${pagePathArray.join(`/`)}`)
    }
  }

  const updateLanguage = e => {
    const { value } = e.target
    toggleLanguageModal()

    if (pagePathArray[0] === lang) {
      pagePathArray.shift()
      navigateToSelectedPath(value)
    } else {
      navigateToSelectedPath(value)
    }
  }

  const createPageLanguages = useCallback(() => {
    const langArr = []

    isoLanguage?.forEach(lang => {
      const langInArray = languages?.find(
        fmmLang => fmmLang?.node?.fmmCore?.languageCode === lang?.code
      )

      if (langInArray) {
        langArr.push({
          name: lang?.name,
          code: lang?.code,
        })
      }
    })

    setPageLanguages(langArr)
  }, [languages])

  useEffect(() => {
    const languageName = pageLanguages?.find(
      language => language.code === lang
    )?.name
    setSelectedLanguageName(languageName)
  }, [lang, pageLanguages])

  useEffect(() => {
    createPageLanguages()
  }, [languages, createPageLanguages])

  const toggleLanguageModal = () => setLanguageModal(!languageModal)
  const toggleMenuModal = () => setMenuModal(!menuModal)

  return (
    <>
      <HrefLangs languages={languages} slug={slug} />
  

      <header
        id="header"
        className={`${menuModal ? "mobile-menu-active" : ""} ${lang}`}
      >
        <section className="container">
          <section className="row">
            <Col xs="6" md="3" className="d-flex align-items-center">
              <Link to="/" lang={lang}>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={FMMLogoMobile}
                    height="40px"
                    width="120px"
                  />
                  <img
                    src={FMMLogo}
                    alt="Find My Method"
                    height="60"
                    width="192"
                  />
                </picture>
              </Link>
            </Col>

            <Col xs="6" md="9" className="d-flex d-lg-none align-items-center">
              <section className="ml-auto">
                <button className="icon-button" onClick={toggleLanguageModal}>
                  <img
                    src={!menuModal ? LanguageIcon : LanguageIconColored}
                    height="22px"
                    width="22px"
                    alt=""
                  />
                </button>

                <button className="icon-button ml-3" onClick={toggleMenuModal}>
                  <img
                    src={!menuModal ? HamburgerIcon : HamburgerCloseIcon}
                    height="40"
                    width="40"
                    alt=""
                  />
                </button>
              </section>
            </Col>

            <nav className="nav d-none d-lg-flex col-5 col-sm-8 col-md-9">
              <HeaderMenu
                lang={lang}
                toggleLanguageModal={toggleLanguageModal}
                selectedLanguageName={selectedLanguageName}
              />

              <Button
                onClick={toggleLanguageModal}
                className="button button--small button--secondary"
              >
                <img
                  src={LanguageIcon}
                  width="100%"
                  loading="lazy"
                  className="ml-2"
                  alt="Language Selector"
                />
                <span className="lang-name">{selectedLanguageName}</span>
              </Button>
            </nav>
          </section>
        </section>
      </header>

      <Modal
        isOpen={languageModal}
        toggle={toggleLanguageModal}
        returnFocusAfterClose={false}
        className="language-selector"
      >
        <ModalBody>
          <Container>
            <section className="language__holder">
              {pageLanguages?.map((language, index) => (
                <Fragment key={index}>
                  {language.code !== lang && (
                    <button
                      onClick={updateLanguage}
                      className="language__item"
                      value={language.code}
                      name={language.name}
                    >
                      {language.name}
                    </button>
                  )}
                </Fragment>
              ))}
            </section>
          </Container>
        </ModalBody>
      </Modal>

      <section className={`mobile-menu ${menuModal ? "active" : ""}`}>
        <nav className="menu">
          <HeaderMenu
            lang={lang}
            toggleLanguageModal={toggleLanguageModal}
            selectedLanguageName={selectedLanguageName}
          />
        </nav>

        <section className="mt-auto">
          <SocialIcons inverted />
        </section>
      </section>
    </>
  )
}

export default Header
