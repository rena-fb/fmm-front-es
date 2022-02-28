import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, Seo } from "../../components"
import GenericContraceptive from "../../images/hero-condoms.svg"
import { stripTags } from "../../lib/utils"

const SingleMethod = ({ data, pageContext }) => {
  const lang = data?.MethodDetails?.edges[0]?.node?.fmmCore?.languageCode
  const slug = data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
  const copyrightMessage = stripTags(
    data?.FooterCopyright?.edges[0]?.node?.content
  )

  return (
    <Layout
      lang={lang}
      languages={data?.Languages?.edges}
      copyrightMessage={copyrightMessage}
      slug={slug}
    >
      <Seo
        title={
          data?.MethodDetails?.edges[0]?.node?.fmmCore?.seoTitle ||
          data?.MethodDetails?.edges[0]?.node?.title
        }
        description={
          data?.MethodDetails?.edges[0]?.node?.fmmCore?.seoDescription
        }
        lang={lang}
      />

      <Hero
        title={data?.MethodDetails?.edges[0]?.node?.method_data?.name}
        intro={data?.MethodDetails?.edges[0]?.node?.hero?.intro}
        imageUrl={
          data?.MethodDetails?.edges[0]?.node?.method_data?.image?.sourceUrl ||
          GenericContraceptive
        }
        slug="single-method"
        lang={lang}
        pageContext={pageContext}
        isMethod
      />

      <section className="page-section pb-0">
        <Container>
          <Row>
            <Col xs="12">
              <h3>
                {
                  data?.SingleBirthControlSectionTitleSummary?.edges[0]?.node
                    ?.title
                }
              </h3>
              <section
                className="page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.MethodDetails?.edges[0]?.node?.method_data?.summary,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pb-0">
        <Container>
          <Row>
            <Col
              xs="12"
              lg="5"
              className="d-flex align-items-center mb-5 mb-lg-0"
            >
              <img
                src={
                  data?.MethodDetails?.edges[0]?.node?.method_data?.image
                    ?.sourceUrl
                }
                alt=""
                className="single-method-image quick-facts"
              />
            </Col>
            <Col xs="12" lg="7">
              <h3>
                {
                  data?.SingleBirthControlSectionTitleQuickFacts?.edges[0]?.node
                    ?.title
                }
              </h3>

              <section
                className="page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.MethodDetails?.edges[0]?.node?.method_data
                      ?.quickFacts,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pb-0">
        <Container>
          <Row>
            <Col xs="12">
              <h3>
                {
                  data?.SingleBirthControlSectionTitleDetails?.edges[0]?.node
                    ?.title
                }
              </h3>
              <section
                className="page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.MethodDetails?.edges[0]?.node?.method_data?.details,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pb-0">
        <Container>
          <Row>
            <Col xs="12" lg="5" className="mb-5 mb-lg-0">
              <img
                src={
                  data?.MethodDetails?.edges[0]?.node?.method_data?.image
                    ?.sourceUrl
                }
                alt=""
                className="single-method-image how-to-use"
              />
            </Col>

            <Col xs="12" lg="7">
              <h3>
                {
                  data?.SingleBirthControlSectionTitleHowToUse?.edges[0]?.node
                    ?.title
                }
              </h3>

              <section
                className="page-content htu"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.MethodDetails?.edges[0]?.node?.method_data?.howToUse,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pb-0">
        <Container>
          <Row>
            <Col xs="12" lg="7" className="order-1 order-lg-0">
              <h3>
                {
                  data?.SingleBirthControlSectionTitleSideEffects?.edges[0]
                    ?.node?.title
                }
              </h3>

              <section
                className="page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.MethodDetails?.edges[0]?.node?.method_data
                      ?.sideEffects,
                }}
              />
            </Col>

            <Col
              xs="12"
              lg="5"
              className="d-flex align-items-center mb-5 mb-lg-0 order-0"
            >
              <img
                src={
                  data?.MethodDetails?.edges[0]?.node?.method_data?.image
                    ?.sourceUrl
                }
                alt=""
                className="single-method-image positive-side-effects"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section">
        <Container>
          <Row>
            <Col
              xs="12"
              lg="5"
              className="d-flex align-items-center mb-5 mb-lg-0"
            >
              <img
                src={
                  data?.MethodDetails?.edges[0]?.node?.method_data?.image
                    ?.sourceUrl
                }
                alt=""
                className="single-method-image negative-side-effects"
              />
            </Col>
            <Col xs="12" lg="7">
              <section
                className="page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.MethodDetails?.edges[0]?.node?.method_data
                      ?.negativeSideEffects,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pt-0">
        <Container>
          <Row>
            <Col xs="12">
              {data?.ReferenceTitle?.edges[0]?.node?.title ? (
                <h2>{data?.ReferenceTitle?.edges[0]?.node?.title}</h2>
              ) : (
                <h2 className="en">
                  {data?.EnglishReferenceTitle?.edges[0]?.node?.title}
                </h2>
              )}

              <section
                className="page-content en"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.EnglishMethodDetails?.edges[0]?.node?.method_data
                      ?.references,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* {data?.MethodDetails?.edges[0]?.node?.method_data?.references && (
        <section className="page-section pt-0">
          <Container>
            <Row>
              <Col xs="12">
                {data?.ReferenceTitle?.edges[0]?.node?.title ? (
                  <h2>{data?.ReferenceTitle?.edges[0]?.node?.title}</h2>
                ) : (
                  <h2 className="en">
                    {data?.EnglishReferenceTitle?.edges[0]?.node?.title}
                  </h2>
                )}

                {data?.MethodDetails?.edges[0]?.node?.method_data
                  ?.references ? (
                  <section
                    className="page-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.MethodDetails?.edges[0]?.node?.method_data
                          ?.references,
                    }}
                  />
                ) : (
                  <section
                    className="page-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.EnglishMethodDetails?.edges[0]?.node?.method_data
                          ?.references,
                    }}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </section>
      )} */}
    </Layout>
  )
}

export default SingleMethod

export const query = graphql`
  query ($frontend_slug: String!, $language_code: String!) {
    MethodDetails: allWpMethod(
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
          content
          title
          hero {
            title
            linkUrl
            linkLabel
            intro
            image {
              sourceUrl
            }
          }
          method_data {
            country
            criteria
            excerpt
            name
            summary
            details
            quickFacts
            howToUse
            sideEffects
            negativeSideEffects
            references
            image {
              id
              sourceUrl
            }
          }
          fmmCore {
            languageCode
            frontendSlug
            seoDescription
            seoTitle
          }
        }
      }
    }
    
    EnglishMethodDetails: allWpMethod(
      filter: {
        fmmCore: {
          languageCode: { eq: "en" }
          frontendSlug: { eq: $frontend_slug }
        }
      }
    ) {
      edges {
        node {
          id
          method_data {
            references
          }
        }
      }
    }

    Languages: allWpMethod(
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

    ReferenceTitle: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "ReferenceTitle" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    EnglishReferenceTitle: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: "en" } }
        generic_block_data: { type: { eq: "ReferenceTitle" } }
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }

    SingleBirthControlSectionTitleSummary: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: {
          type: { eq: "SingleBirthControlSectionTitleSummary" }
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

    SingleBirthControlSectionTitleQuickFacts: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: {
          type: { eq: "SingleBirthControlSectionTitleQuickFacts" }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    SingleBirthControlSectionTitleDetails: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: {
          type: { eq: "SingleBirthControlSectionTitleDetails" }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    SingleBirthControlSectionTitleHowToUse: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: {
          type: { eq: "SingleBirthControlSectionTitleHowToUse" }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    SingleBirthControlSectionTitleSideEffects: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: {
          type: { eq: "SingleBirthControlSectionTitleSideEffects" }
        }
      }
    ) {
      edges {
        node {
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
