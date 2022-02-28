import React, { Fragment } from "react"
import { Col, Container, Row } from "reactstrap"

const FaqContactUs = ({ pageContent, lang, ourTeam }) => {
  return (
    <Fragment>
      <section className="page-section">
        <Container className="text-center">
          {pageContent?.length !== 0 && (
            <Row>
              <Col xs="12">
                <section className="section-title">
                  <h2>{pageContent[0]?.node?.title}</h2>
                  <section
                    dangerouslySetInnerHTML={{
                      __html: pageContent[0]?.node?.content,
                    }}
                  />
                </section>
              </Col>
            </Row>
          )}

          {pageContent[0]?.node?.generic_block_data?.linkTo?.url && (
            <Row>
              <Col xs="12">
                <a
                  href={`${pageContent[0]?.node?.generic_block_data?.linkTo?.url}`}
                  className="button"
                >
                  {pageContent[0]?.node?.generic_block_data?.linkLabel}
                </a>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Fragment>
  )
}

export default FaqContactUs
