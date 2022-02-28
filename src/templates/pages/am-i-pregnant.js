import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, PregnancyQuiz, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const AmIPregnant = ({ data, pageContext }) => {
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
            <Col
              xs="12"
              dangerouslySetInnerHTML={{
                __html: data?.AmIPregnantContent?.edges[0]?.node?.content,
              }}
            />
          </Row>
          <Row>
            <Col xs="12" className=" mt-4">
              <h5>{data?.AmIPregnantSymptomsTitle?.edges[0]?.node?.title}</h5>
            </Col>
          </Row>
          {data?.PregnancySymptoms?.edges.map((symptom, index) => (
            <Row key={index} className="mb-5">
              <Col
                xs="12"
                lg="5"
                className={`mb-4 mb-lg-0 d-flex align-items-center ${
                  index % 2 === 0 && "order-lg-1"
                }`}
              >
                <img
                  src={symptom?.node?.generic_block_data?.image?.sourceUrl}
                  alt=""
                />
              </Col>

              <Col
                xs="12"
                lg="7"
                className="page-content d-flex align-items-center"
                dangerouslySetInnerHTML={{
                  __html: symptom?.node?.content,
                }}
              />
            </Row>
          ))}
        </Container>
      </section>

      <PregnancyQuiz
        lang={lang}
        imageUrl={data?.PageDetails?.edges[0]?.node?.hero?.image?.sourceUrl}
        quizzes={data?.PregnancyQuiz?.edges}
        quizResults={data?.PregnancyQuizResult?.edges}
        errorMessage={data?.PregnancyQuizError?.edges[0]}
      />

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
                  __html: data?.AmIPregnantReference?.edges[0]?.node?.content,
                }}
              />
            ) : (
              <section
                className="col-12 page-content en"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.AmIPregnantEnglishReference?.edges[0]?.node?.content,
                }}
              />
            )}
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default AmIPregnant

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

    AmIPregnantContent: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AmIPregnantContent" } }
      }
    ) {
      edges {
        node {
          content
        }
      }
    }

    AmIPregnantSymptomsTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AmIPregnantSymptomsTitle" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    AmIPregnantReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AmIPregnantReference" } }
      }
    ) {
      edges {
        node {
          content
        }
      }
    }

    AmIPregnantEnglishReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: "en" }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "AmIPregnantReference" } }
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

    PregnancySymptoms: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancySymptoms" } }
      }
    ) {
      edges {
        node {
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    AmIPregnantChildrenPages: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
      }
    ) {
      edges {
        node {
          content
          generic_block_data {
            image {
              sourceUrl
            }
          }
        }
      }
    }

    PregnancyQuiz: allWpQuiz(
      sort: { fields: quiz___priorityOrder }
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        quiz: { quizType: { eq: "PregnancyQuiz" } }
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

    PregnancyQuizResult: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "PregnancyQuizResult" } }
      }
    ) {
      edges {
        node {
          title
          content
          generic_block_data {
            priorityOrder
          }
        }
      }
    }

    PregnancyQuizError: allWpGenericBlock(
      filter: {
        fmmCore: { languageCode: { eq: $language_code } }
        generic_block_data: { type: { eq: "PregnancyQuizError" } }
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
