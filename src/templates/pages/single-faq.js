import { graphql } from "gatsby"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { FaqContactUs, Hero, Layout, Seo } from "../../components"
import { stripTags } from "../../lib/utils"

const SingleFaq = ({ data, pageContext }) => {
  const lang = data?.FaqDetails?.edges[0]?.node?.fmmCore?.languageCode
  const slug = data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
  const copyrightMessage = stripTags(
    data?.FooterCopyright?.edges[0]?.node?.content
  )
  const [faqCrumbs, setFaqCrumbs] = useState([])
  const { breadcrumb } = pageContext || {}

  useEffect(() => {
    const result = []

    breadcrumb.crumbs.forEach(crumb => {
      const crumbLabel = crumb.crumbLabel.replace(/-/g, " ")
      crumb.crumbLabel = crumbLabel
      result.push(crumb)
    })

    setFaqCrumbs(result)
  }, [breadcrumb])

  return (
    <Layout
      lang={lang}
      languages={data?.Languages?.edges}
      copyrightMessage={copyrightMessage}
      slug={slug}
    >
      <Seo
        title={data?.FaqDetails?.edges[0]?.node?.fmmCore?.seoTitle}
        description={data?.FaqDetails?.edges[0]?.node?.fmmCore?.seoDescription}
        lang={lang}
      />

      <Hero lang={lang} slug="single-faq" pageContext={pageContext} isFaq />

      <section className="page-section single-faq-page pb-0">
        <Container>
          <Row>
            <Col xs="12">
              <h1 className="single-faq-page__title">
                {data?.FaqDetails?.edges[0]?.node?.title}
              </h1>
            </Col>
            <Col xs="12">
              <section
                className="single-faq-page__content page-content"
                dangerouslySetInnerHTML={{
                  __html: data?.FaqDetails?.edges[0]?.node?.content,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section mt-2 pt-5 d-none">
        <Container>
          <Row>
            <Col xs="12">
              <section className="breadcrumb-faq d-flex justify-content-center justify-content-lg-start w-100">
                <Breadcrumb
                  crumbs={faqCrumbs || []}
                  crumbSeparator=" / "
                  crumbLabel={data?.FaqDetails?.edges[0]?.node?.title}
                />
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

export default SingleFaq

export const query = graphql`
  query ($frontend_slug: String!, $language_code: String!) {
    FaqDetails: allWpFaq(
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
          fmmCore {
            languageCode
            frontendSlug
            seoDescription
            seoTitle
          }
        }
      }
    }

    Languages: allWpFaq(
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
