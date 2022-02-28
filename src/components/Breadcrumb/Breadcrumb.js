import React, { useEffect, useState } from "react"

const Breadcrumb = ({ breadcrumb, lang }) => {
  const [bCrumbs, setBCrumb] = useState()

  const { crumbs } = breadcrumb

  useEffect(() => {
    if (lang !== "en") {
      crumbs.splice(0, 1)
    }
    setBCrumb(crumbs)
  }, [crumbs, lang])

  return (
    <section className="row">
      {bCrumbs?.map((item, index) => (
        <a href={item.pathname} key={index}>
          {item.title}
        </a>
      ))}
    </section>
  )
}

export default Breadcrumb
