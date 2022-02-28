import React from "react"
import { Container, Row } from "reactstrap"
import { Link, CookiePopup, SocialIcons } from ".."
import FMMLogoWhiteMobile from "../../images/fmm-logo-white-es-mobile.svg"
import FMMLogoWhite from "../../images/fmm-logo-white-es.svg"
import "./Footer.scss"
import FooterMenu from "./FooterMenu"

const Footer = ({ lang, copyrightMessage }) => {
  return (
    <>
      <footer className="footer">
        <Container>
          <Row className="footer__top">
            <div className="col-12">
              <Link to="/" lang={lang}>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={FMMLogoWhiteMobile}
                    width=""
                  />
                  <img
                    src={FMMLogoWhite}
                    alt="Find My Method"
                    height="60"
                    width="192"
                    loading="lazy"
                  />
                </picture>
              </Link>
            </div>
          </Row>

          <Row>
            <section className="col-12">
              <FooterMenu lang={lang} />
            </section>
          </Row>

          <Row className="d-flex align-items-center">
            <section className="col-12 col-md-6 order-1">
              <p className="footer__copyright">
                © {new Date().getFullYear()} {copyrightMessage}
              </p>
            </section>

            <section className="col-12 col-md-6 order-0 order-md-1">
              <SocialIcons />
            </section>
          </Row>
        </Container>
      </footer>

      <CookiePopup lang={lang} />
    </>
  )
}

export default Footer
