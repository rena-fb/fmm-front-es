import React, { Fragment } from "react"

const QuizQuestion = ({ question, children }) => {
  return (
    <section className="contraception-quiz-question">
      <p className="font-capriola">{question}</p>

      <Fragment>{children}</Fragment>
    </section>
  )
}

export default QuizQuestion
