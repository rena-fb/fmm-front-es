/* eslint-disable react-hooks/exhaustive-deps */
import { graphql } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  Row,
  Table,
} from "reactstrap"
import { CountriesGrid, Hero, Layout, Link, Seo } from "../../components"
import addMethodIcon from "../../images/add-method-icon.svg"
import removeIcon from "../../images/compare-remove.svg"
import closeIcon2 from "../../images/close-icon-2.svg"
import downloadMethodIcon from "../../images/download-method-icon.svg"
import {
  addMethodToCompare,
  getClassFromSlug,
  removeFromCompare,
  stripTags,
} from "../../lib/utils"

const CompareMethods = ({ data, pageContext }) => {
  const lang = data?.PageDetails?.edges[0]?.node?.fmmCore?.languageCode
  const slug = data?.PageDetails?.edges[0]?.node?.fmmCore?.frontendSlug
  const copyrightMessage = stripTags(
    data?.FooterCopyright?.edges[0]?.node?.content
  )

  const [selectMethodModal, setSelectMethodModal] = useState(false)
  const [idealMethodModal, setIdealMethodModal] = useState(false)

  const toggleSelectMethodModal = () => setSelectMethodModal(!selectMethodModal)
  const toggleIdealMethodModal = () => setIdealMethodModal(!idealMethodModal)

  const [compareMethodsData, setCompareMethodsData] = useState([])
  const [compareMethodsId, setCompareMethodsId] = useState([])

  const idealPopupTimer = useCallback(time => {
    setTimeout(() => {
      if (!selectMethodModal) {
        setIdealMethodModal(true)
      }
    }, time)
  }, [])

  useEffect(() => {
    setCompareMethodsData(
      JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)) || []
    )
  }, [])

  const removeItem = method => {
    removeFromCompare({ method, methodId: method?.node?.id }, lang)

    setCompareMethodsData(JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)))
  }

  const addItem = method => {
    addMethodToCompare({ method, methodId: method?.node?.id }, lang)

    setCompareMethodsData(JSON.parse(sessionStorage?.getItem(`compareMethods-${lang}`)))
    toggleSelectMethodModal()
    idealPopupTimer(90000)
  }

  useEffect(() => {
    const ids = []

    compareMethodsData.forEach(item => ids.push(item?.methodId))
    setCompareMethodsId(ids)
  }, [compareMethodsData])

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
          <Row className="mb-5">
            <section className="col-12">
              <section>
                <h2 className="m-0">
                  {data?.CompareMethodsTitle?.edges[0]?.node?.title}
                </h2>

                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html: data?.CompareMethodsTitle?.edges[0]?.node?.content,
                  }}
                />
              </section>
            </section>
          </Row>
          <Row>
            <Col xs="12">
              <section className="compare-table__holder">
                <Table borderless className="compare-table">
                  <thead>
                    <tr>
                      {data?.CompareTableHeader?.edges?.map((header, index) => (
                        <th key={index}>{header?.node?.title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareMethodsData?.map((data, index) => (
                      <tr key={index}>
                        <td className="compare-table__profile">
                          <figure>
                            <div className="compare-table__image-holder">
                              <img
                                src={
                                  data?.method?.node?.method_data?.image
                                    ?.sourceUrl
                                }
                                alt=""
                                width="250px"
                                loading="lazy"
                              />
                            </div>
                            <figcaption>
                              <section className="d-flex">
                                <section>
                                  <Link
                                    to={`${data?.method?.node?.fmmCore?.frontendSlug}`}
                                    lang={lang}
                                  >
                                    {data?.method?.node?.method_data?.name}
                                  </Link>
                                  <p>
                                    {
                                      data?.method?.node?.method_compare_data
                                        ?.hormones
                                    }
                                  </p>
                                </section>
                                <button
                                  className="delete-button align-self-end"
                                  onClick={() => removeItem(data?.method)}
                                >
                                  <img
                                    src={removeIcon}
                                    alt=""
                                    height="20px"
                                    width="20px"
                                    loading="lazy"
                                  />
                                </button>
                              </section>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          {data?.method?.node?.method_compare_data?.whatIsIt}
                        </td>
                        <td>
                          {data?.method?.node?.method_compare_data?.efficacy}%
                        </td>
                        <td>{data?.method?.node?.method_compare_data?.pros}</td>
                        <td>{data?.method?.node?.method_compare_data?.cons}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </section>

              <section className="page-section pb-0">
                {compareMethodsData && compareMethodsData?.length < 6 && (
                  <Button
                    className="compare-buttons"
                    onClick={toggleSelectMethodModal}
                  >
                    <img
                      src={addMethodIcon}
                      alt=""
                      height="20px"
                      width="20px"
                      loading="lazy"
                    />
                    {data?.CompareAddPopupTrigger?.edges[0]?.node?.title}
                  </Button>
                )}

                <Button
                  className="compare-buttons"
                  onClick={() => window.print()}
                >
                  <img
                    src={downloadMethodIcon}
                    alt=""
                    height="20px"
                    width="20px"
                    loading="lazy"
                  />
                  {data?.CompareDownloadPdf?.edges[0]?.node?.title}
                </Button>
              </section>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal
        isOpen={selectMethodModal}
        toggle={toggleSelectMethodModal}
        className="select-method-popup modal-dialog-scrollable"
      >
        <ModalBody>
          <Container fluid>
            <button onClick={toggleSelectMethodModal} className="close-popup">
              <img src={closeIcon2} alt="" />
            </button>
            <Row>
              <Col xs="12">
                <h4 className="m-0">
                  {data?.CompareAddMethod?.edges[0]?.node?.title}
                </h4>
                <section
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html: data?.CompareAddMethod?.edges[0]?.node?.content,
                  }}
                />
              </Col>
            </Row>

            <Row className="select-method-popup__methods-list">
              {data?.Methods?.edges?.map((method, index) => (
                <Col
                  xs="12"
                  sm="6"
                  md="4"
                  lg="3"
                  className="select-method-popup__methods-list-item"
                  key={index}
                >
                  <figure className="compare-popup__image-holder">
                    <img
                      src={method?.node?.method_data?.image?.sourceUrl}
                      alt=""
                      width="250px"
                      loading="lazy"
                    />
                  </figure>
                  <p>{method?.node?.method_data?.name}</p>

                  <button
                    onClick={() => addItem(method)}
                    disabled={compareMethodsId.includes(method?.node?.id)}
                  >
                    {
                      data?.CompareAddMethod?.edges[0]?.node?.generic_block_data
                        .linkLabel
                    }
                  </button>
                </Col>
              ))}
            </Row>
          </Container>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={idealMethodModal}
        toggle={toggleIdealMethodModal}
        className="ideal-method-popup modal-dialog-scrollable"
      >
        <ModalBody>
          <Container fluid>
            <button onClick={toggleIdealMethodModal} className="close-popup">
              <img src={closeIcon2} alt="" />
            </button>
            <Row>
              <Col xs={12}>
                <h3 className="h4 mb-0">
                  {data?.CompareIdealMethodPopupTitle?.edges[0]?.node?.title}
                </h3>
              </Col>
            </Row>

            <Row className="pt-5">
              <Col xs={12}>
                <h4 className="mb-2">
                  {data?.CompareIdealMethodPopupIfSo?.edges[0]?.node?.title}
                </h4>
                <section
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.CompareIdealMethodPopupIfSo?.edges[0]?.node
                        ?.content,
                  }}
                />
              </Col>

              <Col xs={12}>
                <CountriesGrid lang={lang} />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <h4 className="mb-2">
                  {
                    data?.CompareIdealMethodPopupCantFindCountry?.edges[0]?.node
                      ?.title
                  }
                </h4>

                <section
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.CompareIdealMethodPopupCantFindCountry?.edges[0]
                        ?.node?.content,
                  }}
                />

                <section className="page-section pb-0 text-center">
                  <Button
                    className="button"
                    onClick={() => {
                      toggleIdealMethodModal()
                      toggleSelectMethodModal()
                    }}
                  >
                    {
                      data?.CompareIdealMethodPopupCantFindCountry?.edges[0]
                        ?.node?.generic_block_data.linkLabel
                    }
                  </Button>
                </section>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </Layout>
  )
}

export default CompareMethods

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

    CompareMethodsTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareMethodsTitle" } }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }

    Methods: allWpMethod(
      sort: { fields: method_data___priorityOrder }

      filter: { fmmCore: { languageCode: { eq: $language_code } } }
    ) {
      edges {
        node {
          id
          title
          fmmCore {
            frontendSlug
          }
          method_data {
            country
            criteria
            excerpt
            name
            image {
              id
              sourceUrl
            }
          }
          method_compare_data {
            hormones
            pros
            whatIsIt
            cons
            efficacy
          }
        }
      }
    }

    CompareMethodsPopupTitle: allWpGenericBlock(
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: "/birth-control-options" }
        }
        generic_block_data: {
          type: { eq: "BirthControlPreferenceSectionTitle" }
        }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }

    CompareTableHeader: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareTableHeader" } }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }

    CompareAddPopupTrigger: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareAddPopupTrigger" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    CompareDownloadPdf: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareDownloadPdf" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    CompareAddMethod: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareAddMethod" } }
      }
    ) {
      edges {
        node {
          title
          content
          generic_block_data {
            linkLabel
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

    CompareIdealMethodPopupTitle: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareIdealMethodPopupTitle" } }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }

    CompareIdealMethodPopupIfSo: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: { type: { eq: "CompareIdealMethodPopupIfSo" } }
      }
    ) {
      edges {
        node {
          title
          content
        }
      }
    }

    CompareIdealMethodPopupCantFindCountry: allWpGenericBlock(
      sort: { fields: generic_block_data___priorityOrder }
      filter: {
        fmmCore: {
          languageCode: { eq: $language_code }
          frontendSlug: { eq: $frontend_slug }
        }
        generic_block_data: {
          type: { eq: "CompareIdealMethodPopupCantFindCountry" }
        }
      }
    ) {
      edges {
        node {
          title
          content
          generic_block_data {
            linkLabel
          }
        }
      }
    }
  }
`
