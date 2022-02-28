import { graphql } from "gatsby"
import { Link } from "../../components"
import React from "react"
import { Container, Row } from "reactstrap"
import {
  ArticleListItem,
  Hero,
  Layout,
  OurCoverage,
  Seo,
  Tools,
} from "../../components"
import { getClassFromSlug, stripTags } from "../../lib/utils"

const Homepage = ({ data, pageContext }) => {
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
        isHome
      />

      <section className="page-section">
        <Container>
          <Row>
            <section className="col-12 col-lg-10 mx-auto text-left text-md-center">
              <h2 className="col-12 col-xl-10 mx-auto">
                <span
                  dangerouslySetInnerHTML={{
                    __html: data?.HomeIntro?.edges[0]?.node?.title,
                  }}
                />
              </h2>

              <section
                dangerouslySetInnerHTML={{
                  __html: data?.HomeIntro?.edges[0]?.node?.content,
                }}
              />
            </section>
          </Row>
        </Container>
      </section>

      <Tools data={data?.HomeTools?.edges} />

      <section className="page-section">
        <Container>
          <Row>
            <section className="col-12 col-lg-9 mx-auto text-left text-md-center">
              <h2>
                <span
                  dangerouslySetInnerHTML={{
                    __html: data?.HomePlanning?.edges[0]?.node?.title,
                  }}
                />
              </h2>

              <section
                dangerouslySetInnerHTML={{
                  __html: data?.HomePlanning?.edges[0]?.node?.content,
                }}
              />
            </section>
          </Row>
        </Container>
      </section>

      <OurCoverage data={data?.OurCoverage?.edges} lang={lang} />

      <section className="page-section">
        <Container>
          <Row>
            <section className="col-12 mb-lg-5">
              <h2 className="text-left text-md-center mb-5">
                <span
                  dangerouslySetInnerHTML={{
                    __html: data?.HomeBlogSectionTitle?.edges[0]?.node?.title,
                  }}
                />
              </h2>
            </section>
          </Row>

          <Row>
            <section className="col-12">
              {data?.HomePopularBlog?.nodes?.length !== 0
                ? data?.HomePopularBlog?.nodes?.map((article, index) => (
                    <ArticleListItem
                      key={index}
                      title={article.title}
                      date={article.date}
                      imageUrl={
                        article?.featuredImage?.node?.localFile?.childImageSharp
                          ?.fluid?.src
                      }
                      excerpt={article.excerpt}
                      url={`/${article.fmmCore?.frontendSlug}`}
                      lang={article?.fmmCore?.languageCode}
                    />
                  ))
                : data?.HomePopularBlogEnglish?.nodes?.map((article, index) => (
                    <ArticleListItem
                      key={index}
                      title={article.title}
                      date={article.date}
                      imageUrl={
                        article?.featuredImage?.node?.localFile?.childImageSharp
                          ?.fluid?.src
                      }
                      excerpt={article.excerpt}
                      url={`/${article.fmmCore?.frontendSlug}`}
                      lang={article?.fmmCore?.languageCode}
                    />
                  ))}
            </section>
          </Row>

          {(data?.HomeSeeAllArticles?.edges[0]?.node?.title ||
            data?.BlogPageTitle?.edges[0]?.node?.hero?.title) && (
            <Row className="mt-5">
              <section className="col-12 text-center">
                <Link to="/blog" lang={lang} className="button">
                  {data?.HomeSeeAllArticles?.edges[0]?.node?.title ||
                    data?.BlogPageTitle?.edges[0]?.node?.hero?.title}
                </Link>
              </section>
            </Row>
          )}
        </Container>
      </section>
    </Layout>
  )
}

export default Homepage

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

    HomeIntro: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HomeIntro" } }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
        }
      }
    }

    HomeTools: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }

      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HomeTools" } }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
          generic_block_data {
            priorityOrder
            linkLabel
            priorityOrder
            linkTo {
              target
              title
              url
            }
            image {
              sourceUrl
              srcSet
            }
          }
        }
      }
    }

    HomePlanning: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HomePlanning" } }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
        }
      }
    }

    OurCoverage: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "OurCoverage" } }
      }
    ) {
      edges {
        node {
          title
          content
          fmmCore {
            frontendSlug
            languageCode
            seoDescription
            seoTitle
          }
          generic_block_data {
            priorityOrder
            linkLabel
            priorityOrder
            image {
              sourceUrl
              srcSet
            }
          }
        }
      }
    }

    HomeBlogSectionTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HomeBlogTitle" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    HomePopularBlog: allWpPost(
      filter: { fmmCore: { languageCode: { eq: $language_code } } }
      sort: { fields: date, order: DESC }
      limit: 3
    ) {
      nodes {
        slug
        title
        date(formatString: "DD  MMMM, YYYY")
        excerpt
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 300, quality: 100, fit: COVER) {
                  ...GatsbyImageSharpFluid
                  src
                }
              }
            }
          }
        }
        fmmCore {
          frontendSlug
          languageCode
        }
      }
    }

    HomePopularBlogEnglish: allWpPost(
      filter: { fmmCore: { languageCode: { eq: "en" } } }
      sort: { fields: date, order: DESC }
      limit: 3
    ) {
      nodes {
        slug
        title
        date(formatString: "DD  MMMM, YYYY")
        excerpt
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 300, quality: 100, fit: COVER) {
                  ...GatsbyImageSharpFluid
                  src
                }
              }
            }
          }
        }
        fmmCore {
          frontendSlug
          languageCode
        }
      }
    }

    HomeSeeAllArticles: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "HomeSeeAllArticles" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    BlogPageTitle: allWpPage(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: "/blog" }
        }
      }
    ) {
      edges {
        node {
          id
          hero {
            title
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
