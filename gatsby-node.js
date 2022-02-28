/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/BlogPost.js")
  const SingleFaqTemplate = path.resolve("./src/templates/pages/single-faq.js")
  const SingleMethodTemplate = path.resolve(
    "./src/templates/pages/single-method.js"
  )
  const SingleCountryMethodTemplate = path.resolve(
    "./src/templates/pages/single-country-method.js"
  )
  const SingleCountryPageTemplate = path.resolve(
    "./src/templates/pages/single-country-page.js"
  )
  const SingleFaqMethodCategoryTemplate = path.resolve(
    "./src/templates/pages/faq-method-category.js"
  )

  const response = await graphql(`
    {
      site {
        siteMetadata {
          default_lang
          title
          description
          author
        }
      }
      allWpPost (
        filter: {fmmCore: {languageCode: {eq: "es"}}}) {
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
      allWpPage (
        filter: {fmmCore: {languageCode: {eq: "es"}}}) {
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
      allWpFaq (
        filter: {fmmCore: {languageCode: {eq: "es"}}}) {
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
      allWpMethod (
        filter: {fmmCore: {languageCode: {eq: "es"}}}) {
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
      allWpCountryProfile (
        filter: {fmmCore: {languageCode: {eq: "es"}}}) {
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
      CountryPage: allWpPage(
        filter: { fmmCore: { frontendSlug: { glob: "/contraception-in-*" }, languageCode: {eq: "es"} } }
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
      allWpFaqMethod (
        filter: {fmmCore: {languageCode: {eq: "es"}}}) {
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
    }
  `)

  if (response.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const default_lang = response?.data?.site?.siteMetadata?.default_lang

  const BlogPosts = response?.data?.allWpPost?.edges
  const SitePages = response?.data?.allWpPage?.edges
  const FAQs = response?.data?.allWpFaq?.edges
  const Methods = response?.data?.allWpMethod?.edges
  const CountryProfile = response?.data?.allWpCountryProfile?.edges
  const CountryPage = response?.data?.CountryPage?.edges
  const FAQMethod = response?.data?.allWpFaqMethod?.edges

  BlogPosts.forEach(post => {
    feSlug = `/${post?.node?.fmmCore?.frontendSlug}`
    frontendSlug = post?.node?.fmmCore?.frontendSlug
    languageCode = post?.node?.fmmCore?.languageCode

    if (default_lang === languageCode) {
      feSlug = `${feSlug}`
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (post?.node?.fmmCore?.frontendSlug) {
      createPage({
        path: feSlug,
        component: BlogPostTemplate,
        context: {
          id: post.node.id,
          frontend_slug: frontendSlug,
          language_code: languageCode,
        },
      })
    }
  })

  SitePages.forEach(page => {
    feSlug = page?.node?.fmmCore?.frontendSlug
    frontendSlug = page?.node?.fmmCore?.frontendSlug
    languageCode = page?.node?.fmmCore?.languageCode
    let glob_frontend_slug;

    if (frontendSlug.slice(-1) !== "/") {
      glob_frontend_slug = `${frontendSlug}/*`
    } else {
      glob_frontend_slug = `${frontendSlug}*`
    }
    const checkFaqCategory = string => {
      if (
        string.includes("/frequently-asked-questions/") &&
        string !== "/frequently-asked-questions/" &&
        string !== "/frequently-asked-questions"
      ) {
        return "faq-category-page"
      } else {
        return string
      }
    }

    const getPageTemplateSlug = frontendSlug => {
      const slug = checkFaqCategory(frontendSlug)

      switch (slug) {
        case "/":
          return "pages/home.js"

        case "/about":
        case "/about/":
          return "pages/about.js"

        case "/blog":
        case "/blog/":
          return "pages/blog.js"

        case "/birth-control-options":
        case "/birth-control-options/":
          return "pages/birth-control-options.js"

        case "/contraception-quiz":
        case "/contraception-quiz/":
          return "pages/contraception-quiz.js"

        case "/compare-contraceptive-methods":
        case "/compare-contraceptive-methods/":
          return "pages/compare-contraceptive-methods.js"

        case "/am-i-pregnant":
        case "/am-i-pregnant/":
          return "pages/am-i-pregnant.js"

        case "/am-i-pregnant/how-to-confirm-a-pregnancy":
        case "/am-i-pregnant/how-to-confirm-a-pregnancy/":
          return "pages/confirm-pregnancy.js"

        case "/am-i-pregnant/how-does-a-pregnancy-happen":
        case "/am-i-pregnant/how-does-a-pregnancy-happen/":
          return "pages/how-does-a-pregnancy-happen.js"

        case "/am-i-pregnant/pregnancy-options":
        case "/am-i-pregnant/pregnancy-options/":
          return "pages/pregnancy-options.js"

        case "/frequently-asked-questions":
        case "/frequently-asked-questions/":
          return "pages/frequently-asked-questions.js"

        case "faq-category-page":
          return "pages/faq-category.js"

        default:
          return "default-page.js"
      }
    }

    if (default_lang === languageCode) {
      feSlug = `${feSlug}`
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (frontendSlug ==="/blog"){
      const blogPostsPerPage = 10
      const numOfBlogPages = Math.ceil(BlogPosts.length / blogPostsPerPage)

      Array.from({ length: numOfBlogPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? feSlug : `${feSlug}/${i + 1}`,

          component: path.resolve(
              `./src/templates/${getPageTemplateSlug(frontendSlug)}`
          ),
          context: {
            id: page.node.id,
            frontend_slug: frontendSlug,
            language_code: languageCode,
            glob_frontend_slug,
            limit: blogPostsPerPage,
            skip: i * blogPostsPerPage,
            numOfBlogPages,
            currentPage: i + 1,
          },
        })
      })
    } else {
      if (!frontendSlug.includes('contraception-in-')){
        createPage({
          path: feSlug,
          component: path.resolve(
              `./src/templates/${getPageTemplateSlug(frontendSlug)}`
          ),
          context: {
            id: page.node.id,
            frontend_slug: frontendSlug,
            language_code: languageCode,
            glob_frontend_slug
          },
        })
      }
    }
  })

  FAQs.forEach(faq => {
    feSlug = faq?.node?.fmmCore?.frontendSlug
    frontendSlug = faq?.node?.fmmCore?.frontendSlug
    languageCode = faq?.node?.fmmCore?.languageCode

    if (default_lang === languageCode) {
      feSlug = feSlug
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (frontendSlug && languageCode) {
      createPage({
        path: feSlug,
        component: SingleFaqTemplate,
        context: {
          id: faq.node.id,
          frontend_slug: frontendSlug,
          language_code: languageCode,
        },
      })
    }
  })

  Methods.forEach(method => {
    feSlug = method?.node?.fmmCore?.frontendSlug
    frontendSlug = method?.node?.fmmCore?.frontendSlug
    languageCode = method?.node?.fmmCore?.languageCode

    if (default_lang === languageCode) {
      feSlug = feSlug
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (frontendSlug && languageCode) {
      createPage({
        path: feSlug,
        component: SingleMethodTemplate,
        context: {
          id: method.node.id,
          frontend_slug: frontendSlug,
          language_code: languageCode,
        },
      })
    }
  })

  CountryProfile.forEach(profile => {
    feSlug = profile?.node?.fmmCore?.frontendSlug
    frontendSlug = profile?.node?.fmmCore?.frontendSlug
    languageCode = profile?.node?.fmmCore?.languageCode

    if (default_lang === languageCode) {
      feSlug = feSlug
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (frontendSlug && languageCode) {
      createPage({
        path: feSlug,
        component: SingleCountryMethodTemplate,
        context: {
          id: profile.node.id,
          frontend_slug: frontendSlug,
          language_code: languageCode,
        },
      })
    }
  })

  CountryPage.forEach(page => {
    feSlug = page?.node?.fmmCore?.frontendSlug
    frontendSlug = page?.node?.fmmCore?.frontendSlug
    languageCode = page?.node?.fmmCore?.languageCode
    let glob_frontend_slug

    if (frontendSlug.slice(-1) !== "/") {
      glob_frontend_slug = `${frontendSlug}/*`
    } else {
      glob_frontend_slug = `${frontendSlug}*`
    }

    if (default_lang === languageCode) {
      feSlug = feSlug
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (frontendSlug && languageCode) {
      createPage({
        path: feSlug,
        component: SingleCountryPageTemplate,
        context: {
          id: page.node.id,
          frontend_slug: frontendSlug,
          language_code: languageCode,
          glob_frontend_slug,
        },
      })
    }
  })

  FAQMethod.forEach(page => {
    feSlug = page?.node?.fmmCore?.frontendSlug
    frontendSlug = page?.node?.fmmCore?.frontendSlug
    languageCode = page?.node?.fmmCore?.languageCode
    let glob_frontend_slug

    if (frontendSlug.slice(-1) !== "/") {
      glob_frontend_slug = `${frontendSlug}/*`
    } else {
      glob_frontend_slug = `${frontendSlug}*`
    }

    if (default_lang === languageCode) {
      feSlug = feSlug
    } else {
      feSlug = `${languageCode}${feSlug}`
    }

    if (frontendSlug && languageCode) {
      createPage({
        path: feSlug,
        component: SingleFaqMethodCategoryTemplate,
        context: {
          id: page.node.id,
          frontend_slug: frontendSlug,
          language_code: languageCode,
          glob_frontend_slug,
        },
      })
    }
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  // Check if the page is a localized 404
  if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
    const oldPage = { ...page }
    // Get the language code from the path, and match all paths
    // starting with this code (apart from other valid paths)
    const langCode = page.path.split(`/`)[1]
    page.matchPath = `/${langCode}/*`
    // Recreate the modified page
    deletePage(oldPage)
    createPage(page)
  }
}
