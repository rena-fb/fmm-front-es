import React, { useState } from "react"
import { useEffect } from "react"
import {
  Carousel,
  CarouselIndicators,
  CarouselItem,
  Col,
  Container,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap"
import { CountriesGrid } from ".."
import useCountriesInLanguage from "../../hooks/useCountriesInLanguage"
import "./OurCoverage.scss"

const OurCoverage = ({ data, lang }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [itemsArray, setItemsArray] = useState([])
  const countriesInLanguage = useCountriesInLanguage(lang)

  useEffect(() => {
    const items = []
    data.forEach((el, index) => items.push({ key: index, data: el }))

    setItemsArray(items)
  }, [data])

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === data?.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? data?.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = newIndex => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = data?.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <Container>
          <Row>
            <Col xs="12" lg="6" className="coverage__content">
              <h2>{item?.node?.title}</h2>

              <section
                dangerouslySetInnerHTML={{
                  __html: item?.node?.content,
                }}
              />

              {countriesInLanguage.length >= 1 && (
                <UncontrolledDropdown
                  direction="up"
                  className="d-flex flex-column align-items-center"
                >
                  <DropdownToggle className="button">
                    {item?.node?.generic_block_data?.linkLabel}
                  </DropdownToggle>

                  <DropdownMenu
                    className={`country-dropdown continent-${item?.node?.generic_block_data?.priorityOrder}`}
                  >
                    <CountriesGrid lang={lang} />
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Col>

            <section className="d-none d-lg-flex col-lg-5 offset-lg-1">
              <img
                src={item?.node?.generic_block_data?.image?.sourceUrl}
                alt=""
                loading="lazy"
              />
            </section>
          </Row>
        </Container>
      </CarouselItem>
    )
  })

  return (
    <Carousel
      next={next}
      previous={previous}
      activeIndex={activeIndex}
      id="coverageCarousel"
      className="coverage page-section"
      ride="carousel"
      pause="hover"
      interval={7500}
    >
      {slides}

      <Container>
        <Row>
          <Col xs="12">
            <CarouselIndicators
              items={itemsArray}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
          </Col>
        </Row>
      </Container>
    </Carousel>
  )
}

export default OurCoverage
