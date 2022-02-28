import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const About = ({ data, pageContext }) => {
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
            <Col xs="12">
              <Row>
                <Col xs="12">
                  <section className="section-title">
                    <h2 style={{ maxWidth: "500px" }}>
                      {data?.AboutUsContent?.edges[0]?.node?.title}
                    </h2>
                  </section>
                </Col>
              </Row>
              <Row>
                <section className="col-12 about">
                  <section
                    dangerouslySetInnerHTML={{
                      __html: data?.AboutUsContent?.edges[0]?.node?.content,
                    }}
                  />
                </section>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-parallax">
        <Container>
          <Row>
            <Col xs="12">
              <h3> {data?.AboutUsQuote?.edges[0]?.node?.title}</h3>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <OurTeam
        data={data?.AboutUsTeamTitle?.edges[0]?.node}
        team={data?.OurTeam?.edges}
      /> */}
    </Layout>
  )
}

export default About

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

    AboutUsContent: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AboutUsContent" } }
      }
    ) {
      edges {
        node {
          content
          title
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
        }
      }
    }

    AboutUsQuote: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AboutQuote" } }
      }
    ) {
      edges {
        node {
          id
          title
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
        }
      }
    }

    AboutUsTeamTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AboutUsTeamTitle" } }
      }
    ) {
      edges {
        node {
          id
          title
          content
          fmmCore {
            languageCode
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
        fmmCore: {
          languageCode: { eq: $language_code }
        }
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
