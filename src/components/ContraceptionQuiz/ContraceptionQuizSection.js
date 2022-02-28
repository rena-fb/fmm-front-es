import React, { Fragment } from "react"

const ContraceptionQuizSection = ({ title, children, current, multi, id }) => {
  return (
    <>
      {parseInt(id) === current && (
        <section className={`contraception-quiz-section ${multi && "multi"}`}>
          <h3 className="section-title">{title}</h3>

          <Fragment>{children}</Fragment>
        </section>
      )}
    </>
  )
}

export default ContraceptionQuizSection
