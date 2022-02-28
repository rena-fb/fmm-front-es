import { graphql, navigate } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "reactstrap"
import { ContraceptionQuiz, Hero, Layout, Method, Seo } from "../../components"
import NextIcon from "../../images/blog-next-icon.svg"
import CloseIcon from "../../images/close-icon.svg"
import removeIcon from "../../images/compare-remove.svg"
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
  const [quizComplete, setQuizComplete] = useState(false)
  const [methodsToDisplay, setMethodsToDisplay] = useState([])
  const [suggestedMethodIds, setSuggestedMethodIds] = useState(["02", "03"])
  const [quizStarted, setQuizStarted] = useState(false)

  const startQuiz = () => {
    setQuizStarted(true)
  }

  useEffect(() => {
    const result = []

    for (let i = 0; i < methods.length; i++) {
      const method = methods[i]
      const priorityOrder = method?.node?.method_data?.priorityOrder
      if (suggestedMethodIds.includes(priorityOrder)) result.push(method)
    }

    setMethodsToDisplay(result)
  }, [suggestedMethodIds, methods, quizComplete])

  useEffect(() => {
    setCompareMethodsData(
      JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)) || []
    )
  }, [lang])

  const compareMethod = useCallback(method => {
    addMethodToCompare({ method, methodId: method?.node?.id }, lang)

    setCompareMethodsData(JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)))
    setOpenDrawer(true)
  }, [lang])

  const removeItem = method => {
    removeFromCompare({ method, methodId: method?.node?.id }, lang)

    setCompareMethodsData(JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)))
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
      className={`quiz-page ${!quizComplete ? "quiz-progress" : ""}`}
      slug={slug}
    >
      <Seo
        title={data?.PageDetails?.edges[0]?.node?.fmmCore?.seoTitle}
        description={data?.PageDetails?.edges[0]?.node?.fmmCore?.seoDescription}
        lang={lang}
      />

      {!quizStarted ? (
        <Hero
          title={data?.PageDetails?.edges[0]?.node?.hero?.title}
          intro={data?.PageDetails?.edges[0]?.node?.hero?.intro}
          linkTitle={data?.PageDetails?.edges[0]?.node?.hero?.linkLabel}
          linkUrl={startQuiz}
          linkType="function"
          imageUrl={data?.PageDetails?.edges[0]?.node?.hero?.image?.sourceUrl}
          slug={getClassFromSlug(
            data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
          )}
          pageContext={pageContext}
          lang={lang}
        />
      ) : quizComplete ? (
        <Hero
          title={data?.ContraceptionQuizResultTitle?.edges[0]?.node?.title}
          intro={data?.ContraceptionQuizResultTitle?.edges[0]?.node?.content}
          imageUrl={data?.PageDetails?.edges[0]?.node?.hero?.image?.sourceUrl}
          slug={getClassFromSlug(
            data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
          )}
          pageContext={pageContext}
          lang={lang}
        />
      ) : (
        <ContraceptionQuiz
          titles={data?.ContraceptionQuizTitle?.edges}
          completed={setQuizComplete}
          suggestedMethodIds={suggestedMethodIds}
          setSuggestedMethodIds={setSuggestedMethodIds}
          quizzes={data?.ContraceptionQuizQuestions?.edges}
        />
      )}

      {quizComplete && (
        <>
          <section className="page-section">
            <Container>
              <Row className="row">
                <section className="col-12">
                  <section>
                    <h2 className="mb-3">
                      {
                        data?.BirthControlMethodsSectionTitle?.edges[0]?.node
                          ?.title
                      }
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
                            src={
                              data?.method?.node?.method_data?.image?.sourceUrl
                            }
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
                          {data?.method?.node?.title}
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
                      {
                        data?.BirthControlComparePopupButton?.edges[0]?.node
                          ?.title
                      }
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
        </>
      )}
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
          title
          fmmCore {
            languageCode
            frontendSlug
          }
        }
      }
    }

    ContraceptionQuizTitle: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder, order: ASC }

      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "ContraceptionQuizTitle" } }
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
          generic_block_data {
            priorityOrder
          }
        }
      }
    }

    ContraceptionQuizQuestions: allWpQuiz(
      sort: { fields: quiz___priorityOrder }
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        quiz: { quizType: { eq: "ContraceptiveQuiz" } }
      }
    ) {
      edges {
        node {
          id
          title
          quiz {
            priorityOrder
            question
            sectionTitleId
            quizType
            options {
              answerId
              label
              type
              value
            }
          }
        }
      }
    }

    BirthControlMethodsSectionTitle: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
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
        }
      }
    }

    BirthControlCompareButton: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
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

    BirthControlComparePopupButton: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
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
        fmmCore: { languageCode: { eq: $language_code } }
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
        fmmCore: { languageCode: { eq: $language_code } }
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

    ContraceptionQuizResultTitle: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "ContraceptionQuizResultTitle" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
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
