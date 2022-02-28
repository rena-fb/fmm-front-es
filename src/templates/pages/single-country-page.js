import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, Link, Seo } from "../../components"
import GenericContraceptive from "../../images/hero-condoms.svg"
import { stripTags } from "../../lib/utils"

const SingleCountryMethod = ({ data, pageContext }) => {
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
          data?.PageDetails?.edges[0]?.node?.title
        }
        description={data?.PageDetails?.edges[0]?.node?.fmmCore?.seoDescription}
        lang={lang}
      />

      <Hero
        title={data?.PageDetails?.edges[0]?.node?.hero?.title}
        intro={data?.PageDetails?.edges[0]?.node?.hero?.intro}
        imageUrl={
          data?.PageDetails?.edges[0]?.node?.hero?.image?.sourceUrl ||
          GenericContraceptive
        }
        lang={lang}
        pageContext={pageContext}
        isMethod
      />

      {data?.PageDetails?.edges[0]?.node?.content &&
      <section className="page-section pb-0">
        <Container>
          <Row>
            <Col xs={12}>
              <section
                dangerouslySetInnerHTML={{
                  __html: data?.PageDetails?.edges[0]?.node?.content,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>}

      <section className="page-section country-profile">
        <Container>
          <Row>
            {data?.CountryContraceptives?.edges?.map(method => (
              <Col
                xs="12"
                sm="6"
                lg="4"
                key={method?.node?.id}
                className="mb-4 mb-md-5"
              >
                <section className="country-profile__method-item">
                  <Link to={method?.node?.fmmCore?.frontendSlug} lang={lang}>
                    <figure>
                      <img
                        src={method?.node?.hero?.image?.sourceUrl || ""}
                        alt={method?.node?.hero?.linkLabel}
                        loading="lazy"
                      />
                    </figure>
                    <section>
                      <h3 className="h6 mb-0">{method?.node?.hero?.linkLabel}</h3>
                    </section>
                  </Link>
                </section>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default SingleCountryMethod

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
          content
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

    CountryContraceptives: allWpCountryProfile(
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
