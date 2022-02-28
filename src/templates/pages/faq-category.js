import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { FaqContactUs, Hero, Layout, Link, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"
import ChevronRight from "../../images/chevron-right.svg"

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

      <section className="page-section">
        <Container>
          <Row>
            <Col xs="12">
              <section className="faqs-list">
                {data?.CategoryFaqs?.edges?.map((faq, index) => (
                  <Link
                    to={faq?.node?.fmmCore?.frontendSlug}
                    lang={lang}
                    key={index}
                  >
                    <section>{faq?.node?.title}</section>
                    <img src={ChevronRight} alt="" />
                  </Link>
                ))}
              </section>
            </Col>
          </Row>
        </Container>
      </section>

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
  query (
    $frontend_slug: String!
    $language_code: String!
    $glob_frontend_slug: String!
  ) {
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

    CategoryFaqs: allWpFaq(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { glob: $glob_frontend_slug }
        }
      }
    ) {
      edges {
        node {
          id
          title
          content
          fmmCore {
            frontendSlug
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
