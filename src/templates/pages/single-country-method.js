import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, Seo } from "../../components"
import GenericContraceptive from "../../images/hero-condoms.svg"
import { stripTags } from "../../lib/utils"

const SingleCountryMethod = ({ data, pageContext }) => {
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
        title={data?.MethodDetails?.edges[0]?.node?.hero?.title}
        intro={data?.MethodDetails?.edges[0]?.node?.hero?.intro}
        imageUrl={
          data?.MethodDetails?.edges[0]?.node?.hero?.image?.sourceUrl ||
          GenericContraceptive
        }
        lang={lang}
        pageContext={pageContext}
        isMethod
      />

      <section className="page-section country-profile">
        <Container>
          <Row>
            <Col xs="12">
              <section
                className="country-profile__method"
                dangerouslySetInnerHTML={{
                  __html: data?.MethodDetails?.edges[0]?.node?.content,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default SingleCountryMethod

export const query = graphql`
  query ($frontend_slug: String!, $language_code: String!) {
    MethodDetails: allWpCountryProfile(
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
          fmmCore {
            languageCode
            frontendSlug
            seoDescription
            seoTitle
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
