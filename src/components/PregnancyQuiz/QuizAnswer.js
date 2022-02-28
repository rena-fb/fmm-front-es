import React from "react"

const QuizAnswer = ({ children, id, answer }) => {
  return (
    <>
      {parseInt(id) === answer && (
        <section className="quiz-section answer">{children}</section>
      )}
    </>
  )
}

export default QuizAnswer
