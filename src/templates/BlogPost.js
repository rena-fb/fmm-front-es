import { graphql } from "gatsby"
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { Hero, Layout, Seo } from "../components"
import { stripTags } from "../lib/utils"

const BlogPost = ({ data, pageContext }) => {
  const lang = data?.PostDetails?.fmmCore?.languageCode
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
        title={data?.PostDetails?.fmmCore?.seoTitle || data?.PostDetails?.title}
        description={data?.PostDetails?.fmmCore?.seoDescription}
        lang={lang}
      />

      <Hero
        title={data?.PostDetails?.title}
        intro={data?.PostDetails?.excerpt}
        lang={lang}
        slug="blog-post"
        imageUrl={
          data?.PostDetails?.featuredImage?.node?.localFile?.childImageSharp
            ?.fluid?.src
        }
        pageContext={pageContext}
        isBlogPost
      />

      <section className="blog-post-featured-image pb-0">
        <Container>
          <Row>
            <Col xs="12">
              <figure>
                <img
                  src={
                    data?.PostDetails?.featuredImage?.node?.localFile
                      ?.childImageSharp?.fluid?.src
                  }
                  alt={data?.PostDetails?.title}
                  width="100%"
                />
              </figure>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="page-section">
        <Container>
          <Row>
            <Col xs="12" md="10" className="mx-auto">
              <section
                className="blog-post page-content"
                dangerouslySetInnerHTML={{
                  __html: data?.PostDetails?.content,
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query ($id: String!, $frontend_slug: String!, $language_code: String!) {
    PostDetails: wpPost(id: { eq: $id }) {
      slug
      title
      content
      date(formatString: "DD/MM/YYYY")
      fmmCore {
        languageCode
        seoDescription
        seoTitle
      }
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1300, maxHeight: 600, quality: 100, fit: COVER) {
                ...GatsbyImageSharpFluid
                src
              }
            }
          }
        }
      }
    }

    Languages: allWpPost(
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
          id
          title
          content
        }
      }
    }
  }
`
