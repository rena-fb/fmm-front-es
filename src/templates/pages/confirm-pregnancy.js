/* eslint-disable react-hooks/rules-of-hooks */
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { Col, Container, Row, TabContent, TabPane } from "reactstrap"
import { Hero, Layout, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const PregnancyOptions = ({ data, pageContext }) => {
  const lang = data?.PageDetails?.edges[0]?.node?.fmmCore?.languageCode
  const slug = data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
  const copyrightMessage = stripTags(
    data?.FooterCopyright?.edges[0]?.node?.content
  )

  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    setActiveTab(data?.TypesOfPregnancyTest?.edges[0]?.node?.id)
  }, [data?.TypesOfPregnancyTest?.edges])

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

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
        lang={lang}
        pageContext={pageContext}
      />

      <section className="page-section">
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="section-title">
                {data?.WhatIsPregnancyTest?.edges[0]?.node?.title}
              </h2>
              <section
                className="font-capriola"
                dangerouslySetInnerHTML={{
                  __html: data?.WhatIsPregnancyTest?.edges[0]?.node?.content,
                }}
              />

              <section className="text-center page-section pb-0">
                <figure>
                  <img
                    src={
                      data?.WhatIsPregnancyTest?.edges[0]?.node
                        ?.generic_block_data?.image?.sourceUrl
                    }
                    alt=""
                  />
                </figure>
              </section>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pt-0">
        <Container>
          <Row>
            <Col xs={12} className="section-title">
              <h2 className="mb-3">
                {data?.TypesOfPregnancyTestTitle?.edges[0]?.node?.title}
              </h2>
              <section
                dangerouslySetInnerHTML={{
                  __html:
                    data?.TypesOfPregnancyTestTitle?.edges[0]?.node?.content,
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col xs="12" className="pregnancy-option__toggle">
              {data?.TypesOfPregnancyTest?.edges?.map(option => (
                <button
                  onClick={() => {
                    toggle(`${option?.node?.id}`)
                  }}
                  key={`${option?.node?.id}`}
                  className={`pregnancy-option__toggle-item ${
                    activeTab === option?.node?.id ? "active" : ""
                  }`}
                >
                  <img
                    src={option?.node?.generic_block_data?.image?.sourceUrl}
                    alt=""
                    className="pregnancy-option__toggle-icon"
                  />
                  {option?.node?.title}
                </button>
              ))}
            </Col>
          </Row>

          <Row>
            <Col xs="12 page-content">
              <TabContent activeTab={activeTab}>
                {data?.TypesOfPregnancyTest?.edges[0] && (
                  <TabPane
                    tabId={data?.TypesOfPregnancyTest?.edges[0]?.node?.id}
                  >
                    <section
                      className="mb-5 pregnancy-option__content"
                      dangerouslySetInnerHTML={{
                        __html:
                          data?.TypesOfPregnancyTest?.edges[0]?.node?.content,
                      }}
                    />

                    <Row className="how-to-urine-test">
                      {data?.UrineTestHow?.edges?.map(howTo => (
                        <Col xs={12} md={4} key={howTo?.node?.id}>
                          <figure>
                            <img
                              src={
                                howTo?.node?.generic_block_data?.image
                                  ?.sourceUrl
                              }
                              alt={howTo?.node?.title}
                            />
                            <figcaption className="text-center font-capriola mt-4">
                              {howTo?.node?.title}
                            </figcaption>
                          </figure>
                        </Col>
                      ))}
                    </Row>

                    <section className="table-structure">
                      <section className="table-structure__item">
                        <section className="table-structure__header">
                          {data?.UrineTestAccuracy?.edges[0]?.node?.title}
                        </section>
                        <section
                          className="table-structure__body"
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.UrineTestAccuracy?.edges[0]?.node?.content,
                          }}
                        />
                      </section>

                      <section className="table-structure__item">
                        <section className="table-structure__header">
                          {data?.UrineTestWhenToTakeIt?.edges[0]?.node?.title}
                        </section>
                        <section
                          className="table-structure__body"
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.UrineTestWhenToTakeIt?.edges[0]?.node
                                ?.content,
                          }}
                        />
                      </section>

                      <section className="table-structure__item">
                        <section className="table-structure__header">
                          {data?.UrineTestWhereToTakeIt?.edges[0]?.node?.title}
                        </section>
                        <section
                          className="table-structure__body"
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.UrineTestWhereToTakeIt?.edges[0]?.node
                                ?.content,
                          }}
                        />
                      </section>
                    </section>

                    <Row className="d-flex align-items-center">
                      <Col xs={12} lg={6}>
                        <h4>{data?.UrineTestResult?.edges[0]?.node?.title}</h4>
                        <section
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.UrineTestResult?.edges[0]?.node?.content,
                          }}
                        />
                      </Col>

                      <Col xs={12} lg={6} className="mt-3 mt-lg-0">
                        <img
                          src={
                            data?.UrineTestResult?.edges[0]?.node
                              ?.generic_block_data?.image.sourceUrl
                          }
                          alt={data?.UrineTestResult?.edges[0]?.node?.title}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                )}

                {data?.TypesOfPregnancyTest?.edges[1] && (
                  <TabPane
                    tabId={data?.TypesOfPregnancyTest?.edges[1]?.node?.id}
                  >
                    <section
                      className="pregnancy-option__content"
                      dangerouslySetInnerHTML={{
                        __html:
                          data?.TypesOfPregnancyTest?.edges[1]?.node?.content,
                      }}
                    />

                    <section className="table-structure spaced">
                      {data?.TypesOfBloodTest?.edges.map((test, index) => (
                        <section key={index} className="table-structure__item">
                          <section className="table-structure__header">
                            {test?.node?.title}
                          </section>
                          <section
                            className="table-structure__body"
                            dangerouslySetInnerHTML={{
                              __html: test?.node?.content,
                            }}
                          />
                        </section>
                      ))}
                    </section>

                    <figure className="ectopic-pregnancy-section">
                      <img
                        src={
                          data?.EctopicPregnancy?.edges[0]?.node
                            ?.generic_block_data?.image?.sourceUrl
                        }
                        alt={data?.EctopicPregnancy?.edges[0]?.node?.title}
                      />

                      <figcaption
                        dangerouslySetInnerHTML={{
                          __html:
                            data?.EctopicPregnancy?.edges[0]?.node?.content,
                        }}
                      />
                    </figure>

                    <section className="table-structure">
                      <section className="table-structure__item">
                        <section className="table-structure__header">
                          {data?.BloodTestAccuracy?.edges[0]?.node?.title}
                        </section>
                        <section
                          className="table-structure__body"
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.BloodTestAccuracy?.edges[0]?.node?.content,
                          }}
                        />
                      </section>

                      <section className="table-structure__item">
                        <section className="table-structure__header">
                          {data?.BloodTestWhenToTakeIt?.edges[0]?.node?.title}
                        </section>
                        <section
                          className="table-structure__body"
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.BloodTestWhenToTakeIt?.edges[0]?.node
                                ?.content,
                          }}
                        />
                      </section>

                      <section className="table-structure__item">
                        <section className="table-structure__header">
                          {data?.BloodTestWhereToTakeIt?.edges[0]?.node?.title}
                        </section>
                        <section
                          className="table-structure__body"
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.BloodTestWhereToTakeIt?.edges[0]?.node
                                ?.content,
                          }}
                        />
                      </section>
                    </section>

                    <Row className="d-flex align-items-center">
                      <Col xs={12} lg={6}>
                        <h4>{data?.BloodTestResult?.edges[0]?.node?.title}</h4>
                        <section
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.BloodTestResult?.edges[0]?.node?.content,
                          }}
                        />
                      </Col>

                      <Col xs={12} lg={6} className="mt-3 mt-lg-0">
                        <img
                          src={
                            data?.BloodTestResult?.edges[0]?.node
                              ?.generic_block_data?.image?.sourceUrl
                          }
                          alt={data?.BloodTestResult?.edges[0]?.node?.title}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                )}
              </TabContent>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section pt-0">
        <Container>
          <Row>
            <Col xs="12">
              <section className="section-title mb-5">
                {data?.ReferenceTitle?.edges[0]?.node?.title ? (
                  <h2 style={{ maxWidth: "500px" }}>
                    {data?.ReferenceTitle?.edges[0]?.node?.title}
                  </h2>
                ) : (
                  <h2 style={{ maxWidth: "500px" }} className="en">
                    {data?.EnglishReferenceTitle?.edges[0]?.node?.title}
                  </h2>
                )}
              </section>
            </Col>
          </Row>

          <Row>
            {data?.HowToConfirmPregnancyReference?.edges.length ? (
              <section
                className="col-12 page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.HowToConfirmPregnancyReference?.edges[0]?.node
                      ?.content,
                }}
              />
            ) : (
              <section
                className="col-12 page-content en"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.HowToConfirmPregnancyEnglishReference?.edges[0]?.node
                      ?.content,
                }}
              />
            )}
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default PregnancyOptions

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

    ConfirmPregnancyFirstStep: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "ConfirmPregnancyFirstStep" } }
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

    WhatIsPregnancyTest: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "WhatIsPregnancyTest" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    TypesOfPregnancyTestTitle: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "TypesOfPregnancyTestTitle" } }
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

    TypesOfPregnancyTest: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "TypesOfPregnancyTest" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          generic_block_data {
            linkLabel
            image {
              sourceUrl
            }
          }
        }
      }
    }

    UrineTestHow: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "UrineTestHow" } }
      }
    ) {
      edges {
        node {
          id
          title
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    UrineTestAccuracy: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "UrineTestAccuracy" } }
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

    UrineTestWhenToTakeIt: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "UrineTestWhenToTakeIt" } }
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

    UrineTestWhereToTakeIt: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "UrineTestWhereToTakeIt" } }
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

    UrineTestResult: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "UrineTestResult" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    TypesOfBloodTest: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "TypesOfBloodTest" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    EctopicPregnancy: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "EctopicPregnancy" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    BloodTestAccuracy: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BloodTestAccuracy" } }
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

    BloodTestWhenToTakeIt: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BloodTestWhenToTakeIt" } }
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

    BloodTestWhereToTakeIt: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BloodTestWhereToTakeIt" } }
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

    BloodTestResult: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "BloodTestResult" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    HowToConfirmPregnancyReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HowToConfirmPregnancyReference" } }
      }
    ) {
      edges {
        node {
          content
        }
      }
    }

    HowToConfirmPregnancyEnglishReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: "en" }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HowToConfirmPregnancyReference" } }
      }
    ) {
      edges {
        node {
          content
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
