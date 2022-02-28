import { graphql } from "gatsby"
import React, { useState } from "react"
import { Col, Container, Row, TabContent, TabPane } from "reactstrap"
import { Hero, Layout, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const PregnancyOptions = ({ data, pageContext }) => {
  const lang = data?.PageDetails?.edges[0]?.node?.fmmCore?.languageCode
  const slug = data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
  const copyrightMessage = stripTags(
      data?.FooterCopyright?.edges[0]?.node?.content
  )

  const [activeTab, setActiveTab] = useState(
      data?.PregnancyOption?.edges[0]?.node?.id
  )

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
            <Col
              xs="12"
              className="page-section pt-0 pb-5"
              dangerouslySetInnerHTML={{
                __html: data?.PregnancyOptionContent?.edges[0]?.node?.content,
              }}
            />
          </Row>
          <Row>
            <Col xs="12" className="pregnancy-option__toggle">
              {data?.PregnancyOption?.edges?.map(option => (
                <button
                  onClick={() => {
                    toggle(`${option?.node?.id}`)
                  }}
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
                {data?.PregnancyOption?.edges?.map(option => (
                  <TabPane tabId={option?.node?.id}>
                    <section
                      className="mb-5 pregnancy-option__content"
                      dangerouslySetInnerHTML={{
                        __html: option?.node?.content,
                      }}
                    />
                  </TabPane>
                ))}
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
            {data?.AmIPregnantReference?.edges.length ? (
              <section
                className="col-12 page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.PregnancyOptionReference?.edges[0]?.node?.content,
                }}
              />
            ) : (
              <section
                className="col-12 page-content en"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.EnglishPregnancyOptionReference?.edges[0]?.node
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

    PregnancyOptionContent: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancyOptionContent" } }
      }
    ) {
      edges {
        node {
          content
        }
      }
    }

    PregnancyOption: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancyOption" } }
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
    
    PregnancyOptionReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancyOptionReference" } }
      }
    ) {
      edges {
        node {
          content
        }
      }
    }

    EnglishPregnancyOptionReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: "en" }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancyOptionReference" } }
      }
    ) {
      edges {
        node {
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
