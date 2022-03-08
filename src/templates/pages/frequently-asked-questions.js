import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { FaqContactUs, Hero, Layout, Link, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const FAQ = ({ data, pageContext }) => {
  const lang = data?.PageDetails?.edges[0]?.node?.fmmCore?.languageCode
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
          data?.PageDetails?.edges[0]?.node?.fmmCore?.seoTitle ||
          data?.PageDetails?.edges[0]?.node?.hero?.title
        }
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

      <section className="page-section pb-0">
        <Container>
          {data?.FAQCategorySectionTitle?.edges[0]?.node?.title && (
            <Row>
              <Col xs="12">
                <section className="section-title">
                  <h2>
                    {data?.FAQCategorySectionTitle?.edges[0]?.node?.title}
                  </h2>
                  <section
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.FAQCategorySectionTitle?.edges[0]?.node?.content,
                    }}
                  />
                </section>
              </Col>
            </Row>
          )}

          <Row>
            {data?.FAQCategory.edges?.map((category, index) => (
              <Col
                xs="12"
                sm="6"
                key={index}
                className="mb-4 faq-category-holder"
              >
                <section className="country-profile__method-item" key={index}>
                  <Link to={category?.node?.fmmCore?.frontendSlug} lang={lang}>
                    <figure className="country-profile__method-item-left">
                      <img
                        src={
                          category?.node?.generic_block_data?.image?.sourceUrl
                        }
                        alt={category?.node?.title}
                        loading="lazy"
                      />
                    </figure>
                    <section className="country-profile__method-item-right">
                      <h6>{category?.node?.title}</h6>
                      <section
                        dangerouslySetInnerHTML={{
                          __html: category?.node?.content,
                        }}
                      />
                    </section>
                  </Link>
                </section>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {data?.FAQMethod?.edges?.length !== 0 && (
        <section className="page-section pb-0">
          <Container>
            {data?.FAQCategorySectionTitleMethod?.edges[0]?.node?.title && (
              <Row>
                <Col xs="12">
                  <section className="section-title mb-5">
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          data?.FAQCategorySectionTitleMethod?.edges[0]?.node
                            ?.title,
                      }}
                    />
                  </section>
                </Col>
              </Row>
            )}

            <Row>
              {data?.FAQMethod?.edges?.map((method, index) => (
                <Col
                  xs="12"
                  sm="6"
                  lg="4"
                  key={index}
                  className="mb-4 faq-category-holder faq-category-holder_method"
                >
                  <section className="country-profile__method-item" key={index}>
                    <Link to={method?.node?.fmmCore?.frontendSlug} lang={lang}>
                      <figure className="country-profile__method-item-left">
                        <img
                          src={
                            method?.node?.generic_block_data?.image?.sourceUrl
                          }
                          alt={method?.node?.generic_block_data?.linkLabel}
                          loading="lazy"
                        />
                      </figure>
                      <section className="country-profile__method-item-right">
                        <h6>{method?.node?.generic_block_data?.linkLabel}</h6>
                      </section>
                    </Link>
                  </section>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <FaqContactUs
        lang={lang}
        ourTeam={data?.OurTeam?.edges}
        pageContent={data?.FAQDidntFindAnswer?.edges}
      />
    </Layout>
  )
}

export default FAQ

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

    FAQCategorySectionTitle: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "FAQCategorySectionTitle" } }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }

    FAQCategorySectionTitleMethod: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "FAQCategorySectionTitleMethod" } }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }

    FAQCategory: allWpGenericBlock(
      sort: { fields: date, order: ASC }

      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "FAQCategory" } }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
          }
          generic_block_data {
            linkLabel
            image {
              sourceUrl
            }
          }
        }
      }
    }

    FAQMethod: allWpFaqMethod(
      sort: { fields: generic_block_data___priorityOrder }

      filter: { fmmCore: { languageCode: { eq: $language_code } } }
    ) {
      edges {
        node {
          title
          fmmCore {
            frontendSlug
          }
          generic_block_data {
            linkLabel
            image {
              sourceUrl
            }
          }
        }
      }
    }

    FAQDidntFindAnswer: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: "/frequently-asked-questions" }
        }
        generic_block_data: { type: { eq: "FAQDidntFindAnswer" } }
      }
    ) {
      edges {
        node {
          title
          content
          generic_block_data {
            linkLabel
            linkTo {
              target
              title
              url
            }
          }
        }
      }
    }

    OurTeam: allWpTeam(
      sort: { fields: team_data___priorityOrder }
      filter: { fmmCore: { languageCode: { eq: $language_code } } }
    ) {
      edges {
        node {
          id
          content
          team_data {
            priorityOrder
            about
            designation
            name
            image {
              sourceUrl
            }
          }
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
