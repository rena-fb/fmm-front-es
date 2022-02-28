import { graphql } from "gatsby"
import React from "react"
import { Container, Row } from "reactstrap"
import { ArticleListItem, Hero, Layout, Seo } from "../../components"
import PreviousIcon from "../../images/blog-previous-icon.svg"
import NextIcon from "../../images/blog-next-icon.svg"
import { getClassFromSlug, stripTags } from "../../lib/utils"
import { Link } from "../../components"

const Blog = ({ data, pageContext }) => {
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
            <section className="col-12">
              {data?.BlogPosts?.nodes?.length !== 0
                ? data?.BlogPosts?.nodes?.map((article, index) => (
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
                : data?.BlogPostsEnglish?.nodes?.map((article, index) => (
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

          <Row className="mt-5">
            <section className="col-12 text-center">
              {data?.BlogPosts?.pageInfo?.hasPreviousPage && (
                <Link
                  to={`/blog/${
                    data?.BlogPosts?.pageInfo?.currentPage - 1 !== 1
                      ? data?.BlogPosts?.pageInfo?.currentPage - 1
                      : ""
                  }`}
                  lang={lang}
                  className="button mr-3"
                >
                  <img
                    src={PreviousIcon}
                    width="42px"
                    className="mr-2"
                    loading="lazy"
                    alt=""
                  />
                  {lang === "en" && <span>Previous Page</span>}
                </Link>
              )}

              {data?.BlogPosts?.pageInfo?.hasNextPage && (
                <Link
                  to={`/blog/${data?.BlogPosts?.pageInfo?.currentPage + 1}`}
                  lang={lang}
                  className="button ml-3"
                >
                  {lang === "en" && <span>Next Page</span>}
                  <img
                    src={NextIcon}
                    width="42px"
                    className="ml-2"
                    loading="lazy"
                    alt=""
                  />
                </Link>
              )}
            </section>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query (
    $frontend_slug: String!
    $language_code: String!
    $limit: Int!
    $skip: Int!
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

    BlogPosts: allWpPost(
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: { fmmCore: { languageCode: { eq: $language_code } } }
      limit: $limit
    ) {
      nodes {
        slug
        title
        excerpt
        date(formatString: "DD  MMMM, YYYY")
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
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
    }

    BlogPostsEnglish: allWpPost(
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: { fmmCore: { languageCode: { eq: "en" } } }
      limit: $limit
    ) {
      nodes {
        slug
        title
        excerpt
        date(formatString: "DD  MMMM, YYYY")
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
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
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
