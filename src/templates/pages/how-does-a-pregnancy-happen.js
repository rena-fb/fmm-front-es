import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, Seo } from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const PregnancyOptions = ({ data, pageContext }) => {
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

      <section className="how-pregnancy-happens">
        <section className="page-section pb-0">
          <Container>
            <Row>
              <Col xs={12} className="page-content">
                <section
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.HowPregnancyHappensIntro?.edges[0]?.node?.content,
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="page-section pt-5">
          <Container>
            <Row>
              <Col xs={12} md={4} className="page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.FemaleExternalAnatomy?.edges[0]?.node
                        ?.generic_block_data?.image.sourceUrl
                    }
                    alt={data?.FemaleExternalAnatomy?.edges[0]?.node?.title}
                  />
                  <figcaption className="p mt-3 text-center font-capriola">
                    {data?.FemaleExternalAnatomy?.edges[0]?.node?.title}
                  </figcaption>
                </figure>
              </Col>

              <Col xs={12} md={4} className="page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.FemaleInternalAnatomy?.edges[0]?.node
                        ?.generic_block_data?.image.sourceUrl
                    }
                    alt={data?.FemaleInternalAnatomy?.edges[0]?.node?.title}
                  />
                  <figcaption className="p mt-3 text-center font-capriola">
                    {data?.FemaleInternalAnatomy?.edges[0]?.node?.title}
                  </figcaption>
                </figure>
              </Col>

              <Col xs={12} md={4} className="page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.MaleAnatomy?.edges[0]?.node?.generic_block_data
                        ?.image.sourceUrl
                    }
                    alt={data?.MaleAnatomy?.edges[0]?.node?.title}
                  />
                  <figcaption className="p mt-3 text-center font-capriola">
                    {data?.MaleAnatomy?.edges[0]?.node?.title}
                  </figcaption>
                </figure>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="page-section pt-0">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} lg={6} className="page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.PregnancyProcess?.edges[0]?.node?.generic_block_data
                        ?.image.sourceUrl
                    }
                    alt=""
                  />
                </figure>
              </Col>

              <Col xs={12} lg={5} className="offset-lg-1 page-content">
                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html: data?.PregnancyProcess?.edges[0]?.node?.content,
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="page-section pt-0">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} lg={6} className="page-content">
                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.PregnancyFertilization?.edges[0]?.node?.content,
                  }}
                />
              </Col>

              <Col xs={12} lg={6} className="page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.PregnancyFertilization?.edges[0]?.node
                        ?.generic_block_data?.image.sourceUrl
                    }
                    alt=""
                    className="w-100"
                  />
                </figure>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="page-section pt-0">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} lg={6} className="page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.Blastocyst?.edges[0]?.node?.generic_block_data
                        ?.image.sourceUrl
                    }
                    alt=""
                  />
                </figure>
              </Col>

              <Col xs={12} lg={5} className="offset-lg-1 page-content">
                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html: data?.Blastocyst?.edges[0]?.node?.content,
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="page-section pt-0">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} lg={5} className="page-content">
                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html: data?.Implantation?.edges[0]?.node?.content,
                  }}
                />
              </Col>

              <Col xs={12} lg={6} className="offset-lg-1 page-content">
                <figure className="text-center">
                  <img
                    src={
                      data?.Implantation?.edges[0]?.node?.generic_block_data
                        ?.image.sourceUrl
                    }
                    alt=""
                    className="w-100"
                  />
                </figure>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="page-section pt-0">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} className="page-content">
                <section
                  dangerouslySetInnerHTML={{
                    __html: data?.ImplantationProcess?.edges[0]?.node?.content,
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>
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
            {data?.HowPregnancyHappensReference?.edges.length ? (
              <section
                className="col-12 page-content"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.HowPregnancyHappensReference?.edges[0]?.node?.content,
                }}
              />
            ) : (
              <section
                className="col-12 page-content en"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.HowPregnancyHappensEnglishReference?.edges[0]?.node
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

    HowPregnancyHappensIntro: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HowPregnancyHappensIntro" } }
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

    FemaleExternalAnatomy: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "FemaleExternalAnatomy" } }
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

    FemaleInternalAnatomy: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "FemaleInternalAnatomy" } }
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

    MaleAnatomy: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "MaleAnatomy" } }
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

    PregnancyProcess: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancyProcess" } }
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

    PregnancyFertilization: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "PregnancyFertilization" } }
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

    Blastocyst: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "Blastocyst" } }
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

    Blastocyst: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "Blastocyst" } }
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

    Implantation: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "Implantation" } }
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
    
    ImplantationProcess: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "ImplantationProcess" } }
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

    HowPregnancyHappensReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HowPregnancyHappensReference" } }
      }
    ) {
      edges {
        node {
          content
        }
      }
    }

    HowPregnancyHappensEnglishReference: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: "en" }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HowPregnancyHappensReference" } }
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
