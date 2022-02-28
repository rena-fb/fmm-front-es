import React from "react"
import { Hero, Layout, Seo } from "../components"

const NotFoundPage = () => (
  <Layout className="error-404">
    <Seo title="404: Not found" />

    <Hero
      title="404: Page Not Found"
      intro="You just hit a route that doesn't exist... the sadness"
    />
  </Layout>
)

export default NotFoundPage
