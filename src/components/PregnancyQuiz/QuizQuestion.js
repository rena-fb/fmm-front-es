import React, { Fragment } from "react"
import { Button } from "reactstrap"

const QuizQuestion = ({ question, children, id, current, next, previous }) => {
  return (
    <>
      {parseInt(id) === current && (
        <section className="quiz-section">
          <h3>
            {question}
          </h3>
          
          <Fragment>{children}</Fragment>

          <section className="nav-buttons">
            <Button
              className={`button button--secondary button--small ${
                current > 1 ? "" : "hide"
              }`}
              type="button"
              onClick={previous}
            >
              Previous
            </Button>

            <Button
              className="button button--secondary button--small"
              type="button"
              onClick={next}
            >
              Next
            </Button>
          </section>
        </section>
      )}
    </>
  )
}

export default QuizQuestion
