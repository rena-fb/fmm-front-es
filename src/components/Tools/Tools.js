import { Link } from ".."
import React from "react"
import "./Tools.scss"

const Tools = ({ data }) => {
  return (
    <section className="tools page-section">
      <section className="container">
        <section className="row">
          {data &&
            data.map((item, index) => (
              <section
                key={index}
                className="col-12 col-lg-4 text-center tools__item d-flex flex-column align-items-center"
              >
                <figure className="tools__icon">
                  <img
                    src={item?.node?.generic_block_data?.image?.sourceUrl}
                    alt=""
                    loading="lazy"
                  />
                </figure>

                <h3 className="tools__header">{item.node.title}</h3>

                <section
                  dangerouslySetInnerHTML={{ __html: item.node.content }}
                />

                <Link
                  to={item.node.generic_block_data.linkTo.url}
                  lang={item?.node?.fmmCore?.languageCode}
                  className="button mt-auto"
                >
                  {item.node.generic_block_data.linkLabel}
                </Link>
              </section>
            ))}
        </section>
      </section>
    </section>
  )
}

export default Tools
