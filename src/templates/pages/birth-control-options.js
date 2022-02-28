/* eslint-disable react-hooks/rules-of-hooks */
import { graphql, navigate } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import {
  Button,
  Col,
  Container,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap"
import { Hero, Layout, Method, Seo } from "../../components"
import NextIcon from "../../images/blog-next-icon.svg"
import CloseIcon from "../../images/close-icon.svg"
import removeIcon from "../../images/compare-remove.svg"
import LabelPill from "../../images/label-pill.svg"
import {
  addMethodToCompare,
  getClassFromSlug,
  removeFromCompare,
  stripTags,
} from "../../lib/utils"

const FindMyMethod = ({ data, pageContext }) => {
  const lang = data?.PageDetails?.edges[0]?.node?.fmmCore?.languageCode
  const slug = data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
  const copyrightMessage = stripTags(
    data?.FooterCopyright?.edges[0]?.node?.content
  )

  const methods = data?.Methods?.edges
  const [compareMethodsData, setCompareMethodsData] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    setCompareMethodsData(
      JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)) || []
    )
  }, [lang])

  const [categoriesToggle, setCategoriesToggle] = useState({
    medical: true,
    lifestyle: true,
  })

  const [preferences, setPreferences] = useState([])
  const [over35AndSmoker, setOver35AndSmoker] = useState("")
  const [methodsToDisplay, setMethodsToDisplay] = useState([])

  const handleCategoryToggle = e => {
    const { value, checked } = e.target
    setCategoriesToggle(prevState => ({ ...prevState, [value]: checked }))
  }

  const handlePreferenceChange = e => {
    const { name } = e?.target
    const arr = [...preferences]

    const index = arr.indexOf(name)

    if (index === -1) {
      arr.push(name)
    } else {
      arr.splice(index, 1)
    }

    setPreferences(arr)
  }

  useEffect(() => {
    const isOver35 = preferences.includes("over-35-years")
    const isSmoker = preferences.includes("smoker")

    if (isOver35 && isSmoker) {
      setOver35AndSmoker("over-35-years-smoker")
    } else {
      setOver35AndSmoker("")
    }
  }, [preferences])

  useEffect(() => {
    const result = []

    const prefArr = [...preferences]

    if (over35AndSmoker) {
      prefArr.push(over35AndSmoker)
    }

    for (let i = 0; i < methods.length; i++) {
      const method = methods[i]
      const criteria = method?.node?.method_data?.criteria
      if (criteria?.length > 0) {
        const hasCriteria = prefArr.every(t => criteria.includes(t))
        if (hasCriteria) {
          result.push(method)
        }
      }
    }

    preferences.length !== 0
      ? setMethodsToDisplay(result)
      : setMethodsToDisplay(methods)
  }, [preferences, methods, over35AndSmoker])

  const compareMethod = useCallback(
    method => {
      addMethodToCompare({ method, methodId: method?.node?.id }, lang)

      setCompareMethodsData(
        JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`))
      )
      setOpenDrawer(true)
    },
    [lang]
  )

  const removeItem = method => {
    removeFromCompare({ method, methodId: method?.node?.id }, lang)

    setCompareMethodsData(
      JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`))
    )
  }

  const goToCompare = () => {
    navigate(`${lang !== "en" ? `/${lang}` : ""}/compare-contraceptive-methods`)
  }

  useEffect(() => {
    compareMethodsData?.length === 0 && setOpenDrawer(false)
  }, [compareMethodsData])

  return (
    <Layout
      lang={lang}
      languages={data?.Languages?.edges}
      copyrightMessage={copyrightMessage}
      slug={slug}
    >
      <Seo
        title={data?.PageDetails?.edges[0]?.node?.fmmCore?.seoTitle}
        description={data?.PageDetails?.edges[0]?.node?.fmmCore?.seoDescription}
        lang={lang}
      />

      <Hero
        title={data?.PageDetails?.edges[0]?.node?.hero?.title}
        intro={data?.PageDetails?.edges[0]?.node?.hero?.intro}
        linkTitle={data?.PageDetails?.edges[0]?.node?.hero?.linkLabel}
        linkUrl={data?.PageDetails?.edges[0]?.node?.hero?.linkUrl}
        imageUrl={data?.PageDetails?.edges[0]?.node?.hero?.image?.sourceUrl}
        slug={getClassFromSlug(
          data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
        )}
        pageContext={pageContext}
        lang={lang}
      />

      <section className="page-section">
        <Container>
          <Row className="preference">
            <section className="col-12 mb-4">
              <Row className="preference-heading">
                <section className="col-12 col-lg-9">
                  <h2 className="mb-3">
                    {
                      data?.BirthControlPreferenceSectionTitle?.edges[0]?.node
                        ?.title
                    }
                  </h2>

                  <section
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.BirthControlPreferenceSectionTitle?.edges[0]?.node
                          ?.content,
                    }}
                  />
                </section>

                <section className="col-12 col-lg-3 dropdown">
                  <UncontrolledDropdown className="mt-3">
                    <DropdownToggle className="category_trigger">
                      {
                        data?.BirthControlPreferenceCategoryDropdownTitle
                          ?.edges[0]?.node?.title
                      }
                      <span className="arrow" />
                    </DropdownToggle>

                    <DropdownMenu right>
                      <label className="dropdown-item">
                        {
                          data?.BirthControlPreferenceCategoryDropdown?.edges[0]
                            ?.node?.title
                        }
                        <input
                          defaultChecked={categoriesToggle.lifestyle}
                          type="checkbox"
                          value="lifestyle"
                          name="preferenceCategory"
                          className="preference-category-toggle"
                          onChange={handleCategoryToggle}
                        />
                        <span className="custom-checkbox" />
                      </label>

                      <label className="dropdown-item">
                        {
                          data?.BirthControlPreferenceCategoryDropdown?.edges[1]
                            ?.node?.title
                        }
                        <input
                          defaultChecked={categoriesToggle.medical}
                          type="checkbox"
                          value="medical"
                          name="preferenceCategory"
                          className="preference-category-toggle"
                          onChange={handleCategoryToggle}
                        />
                        <span className="custom-checkbox" />
                      </label>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </section>
              </Row>
            </section>

            {categoriesToggle.lifestyle && (
              <fieldset className="col-12">
                <legend>
                  {
                    data?.BirthControlPreferenceCategoryDropdown?.edges[0]?.node
                      ?.title
                  }
                  :
                </legend>

                <section className="preference-list">
                  {data?.BirthControlMethodsCriteriaLifestyle?.edges?.map(
                    (item, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          onChange={handlePreferenceChange}
                          name={item?.node?.generic_block_data?.linkLabel}
                        />
                        <section className="preference__details">
                          <img
                            src={
                              item?.node?.generic_block_data?.image
                                ?.sourceUrl || LabelPill
                            }
                            loading="lazy"
                            alt=""
                          />
                          <span>{item?.node?.title}</span>
                        </section>
                      </label>
                    )
                  )}
                </section>
              </fieldset>
            )}

            {categoriesToggle.medical && (
              <fieldset className="col-12">
                <legend>
                  {
                    data?.BirthControlPreferenceCategoryDropdown?.edges[1]?.node
                      ?.title
                  }
                  :
                </legend>

                <section className="preference-list">
                  {data?.BirthControlMethodsCriteriaMedical?.edges?.map(
                    (item, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={item?.node?.generic_block_data?.linkLabel}
                          onChange={handlePreferenceChange}
                        />
                        <section className="preference__details">
                          <img
                            src={
                              item?.node?.generic_block_data?.image
                                ?.sourceUrl || LabelPill
                            }
                            loading="lazy"
                            alt=""
                          />
                          <span>{item?.node?.title}</span>
                        </section>
                      </label>
                    )
                  )}
                </section>
              </fieldset>
            )}
          </Row>
          <Row>
            <Col xs={12} className="mb-4 mb-md-5">
              {preferences?.includes("obesity") && (
                <p className="h6 mb-2 font-weight-normal">
                  {data?.PatchEffectiveness90Kg?.edges[0]?.node?.title}
                </p>
              )}
              {preferences?.includes("breastfeeding") && (
                <p className="h6 mb-2 font-weight-normal">
                  {
                    data?.Effectiveness6MonthsBreastfeeding?.edges[0]?.node
                      ?.title
                  }
                </p>
              )}
              {preferences?.includes("breastfeeding") && (
                <p className="h6 mb-2 font-weight-normal">
                  {
                    data?.Effectiveness6WeeksBreastfeeding?.edges[0]?.node
                      ?.title
                  }
                </p>
              )}
              {preferences?.includes("post-delivery-not-breastfeeding") && (
                <p className="h6 mb-2 font-weight-normal">
                  {data?.EffectivenessPostDelivery?.edges[0]?.node?.title}
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pt-0">
        <Container>
          <Row className="row">
            <section className="col-12">
              <section>
                <h2 className="mb-3">
                  {data?.BirthControlMethodsSectionTitle?.edges[0]?.node?.title}
                </h2>

                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.BirthControlMethodsSectionTitle?.edges[0]?.node
                        ?.content,
                  }}
                />
              </section>
            </section>
          </Row>

          <section className="row">
            {methodsToDisplay.length === 0 && (
              <Col xs={12}>
                <h5 className="mb-3">
                  {data?.ContraceptiveNoMatch?.edges[0]?.node?.title}
                </h5>
              </Col>
            )}

            {methodsToDisplay?.map((method, index) => (
              <Method
                key={index}
                title={method?.node?.method_data?.name}
                excerpt={method?.node?.method_data?.excerpt}
                frontendSlug={method?.node?.fmmCore?.frontendSlug}
                imageUrl={method?.node?.method_data?.image?.sourceUrl}
                compareMethod={compareMethod}
                disableCompare={compareMethodsData?.length === 6}
                method={method}
                lang={lang}
                exploreButton={
                  data?.BirthControlExploreButton?.edges[0]?.node?.title
                }
                compareButton={
                  data?.BirthControlCompareButton?.edges[0]?.node?.title
                }
              />
            ))}
          </section>
        </Container>
      </section>

      <section className={`compare-drawer ${openDrawer && "open"}`}>
        <Container>
          <Row>
            <Col xs="12">
              <Button
                className="close-drawer"
                onClick={() => setOpenDrawer(false)}
              >
                <img src={CloseIcon} width="42px" loading="lazy" alt="" />
              </Button>
            </Col>
          </Row>

          <Row className="select-method-popup__methods-list">
            <Col xs="12">
              <section className="compare-drawer__list">
                {compareMethodsData?.map((data, index) => (
                  <section
                    className="select-method-popup__methods-list-item compare-drawer__list-item"
                    key={index}
                  >
                    <figure className="compare-popup__image-holder">
                      <img
                        src={data?.method?.node?.method_data?.image?.sourceUrl}
                        alt=""
                        width="250px"
                        loading="lazy"
                      />
                      <button
                        className="delete-button"
                        onClick={() => removeItem(data?.method)}
                      >
                        <img
                          src={removeIcon}
                          alt=""
                          height="20px"
                          width="20px"
                          loading="lazy"
                        />
                      </button>
                    </figure>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data?.method?.node?.method_data?.name}
                    </p>
                  </section>
                ))}
              </section>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs="12 d-flex">
              <Button
                className="button ml-auto my-compare-btn"
                onClick={goToCompare}
              >
                <span>
                  {data?.BirthControlComparePopupButton?.edges[0]?.node?.title}
                </span>
                <img
                  src={NextIcon}
                  width="42px"
                  className="ml-2"
                  loading="lazy"
                  alt=""
                />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default FindMyMethod

export const query = graphql`
  query ($frontend_slug: String!, $language_code: String!) {
    PageDetails: allWpPage(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
      }
    ) {
      edges {
        node {
          id
          fmmCore {
            languageCode
            frontendSlug
            seoDescription
            seoTitle
          }
          hero {
            title
            linkUrl
            linkLabel
            intro
            image {
              sourceUrl
            }
          }
        }
      }
    }

    Languages: allWpPage(
      filter: { fmmCore: { frontendSlug: { eq: $frontend_slug } } }
    ) {
      edges {
        node {
          id
          fmmCore {
            languageCode
            frontendSlug
          }
        }
      }
    }

    BirthControlPreferenceCategoryDropdownTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "BirthControlPreferenceCategoryDropdownTitle" }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    BirthControlPreferenceCategoryDropdown: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "BirthControlPreferenceCategoryDropdown" }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    BirthControlMethodsCriteriaLifestyle: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "BirthControlMethodsCriteriaLifestyle" }
        }
      }
    ) {
      edges {
        node {
          title
          generic_block_data {
            priorityOrder
            linkLabel
            image {
              sourceUrl
              srcSet
            }
          }
        }
      }
    }

    BirthControlMethodsCriteriaMedical: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "BirthControlMethodsCriteriaMedical" }
        }
      }
    ) {
      edges {
        node {
          title
          generic_block_data {
            priorityOrder
            linkLabel
            image {
              sourceUrl
              srcSet
            }
          }
        }
      }
    }

    BirthControlPreferenceSectionTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "BirthControlPreferenceSectionTitle" }
        }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
        }
      }
    }

    BirthControlMethodsSectionTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BirthControlMethodsSectionTitle" } }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
        }
      }
    }

    Methods: allWpMethod(
      sort: { fields: method_data___priorityOrder, order: ASC }

      filter: { fmmCore: { languageCode: { eq: $language_code } } }
    ) {
      edges {
        node {
          id
          title
          fmmCore {
            frontendSlug
          }
          method_data {
            country
            priorityOrder
            criteria
            excerpt
            name
            image {
              id
              sourceUrl
            }
          }
          method_compare_data {
            hormones
            pros
            whatIsIt
            cons
            efficacy
          }
        }
      }
    }

    BirthControlCompareButton: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BirthControlCompareButton" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    PatchEffectiveness90Kg: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PatchEffectiveness90Kg" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    Effectiveness6MonthsBreastfeeding: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "Effectiveness6MonthsBreastfeeding" }
        }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    Effectiveness6WeeksBreastfeeding: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "Effectiveness6WeeksBreastfeeding" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    EffectivenessPostDelivery: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "EffectivenessPostDelivery" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    BirthControlComparePopupButton: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BirthControlComparePopupButton" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    ContraceptiveNoMatch: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "ContraceptiveNoMatch" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    BirthControlExploreButton: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BirthControlExploreButton" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    FooterCopyright: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "FooterCopyright" } }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`
