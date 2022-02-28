import React, { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import "./PregnancyQuiz.scss"
import QuizAnswer from "./QuizAnswer"
import QuizOption from "./QuizOption"
import QuizQuestion from "./QuizQuestion"

const PregnancyQuiz = ({ imageUrl, quizzes, quizResults, errorMessage }) => {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [correctAnswerId, setCorrectAnswerId] = useState(1)
  const [sectionType, setSectionType] = useState("question")
  const questionNos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  const [selection, setSelection] = useState({})
  const [selectedIds, setSelectedIds] = useState({})
  const [error, setError] = useState("")
  const [periodIsLate, setPeriodIsLate] = useState(false)
  const [unprotectedSex, setUnprotectedSex] = useState(false)
  const [plannedPregnancy, setPlannedPregnancy] = useState(false)

  const next = () => {
    if (selectedIds[parseInt(questionNumber)]) {
      setError("")

      if (questionNumber < 13) {
        calculatePoints(questionNumber)
        setQuestionNumber(() => questionNumber + 1)
      } else {
        showResult()
      }
    } else {
      setError("Please, select ")
    }
  }

  const previous = () => {
    setQuestionNumber(() => questionNumber - 1)
  }

  const handleOptionChange = e => {
    setSelection(prevState => ({
      ...prevState,
      [parseInt(e?.target?.name)]: parseFloat(e?.target?.value),
    }))

    setSelectedIds(prevState => ({
      ...prevState,
      [parseInt(e?.target?.name)]: e?.target?.id,
    }))
  }

  const calculatePoints = questionNumber => {
    switch (parseInt(questionNumber)) {
      default:
        break

      case 3:
        if (selectedIds[3] === "q03a02" && selectedIds[2] === "q02a01") {
          setUnprotectedSex(true)
        }
        break

      case 5:
        if (selection[5] === 5) {
          setPeriodIsLate(true)
        }
        break

      case 13:
        if (selection[13] === 1) {
          setPlannedPregnancy(true)
        }
        break
    }
  }

  const showResult = () => {
    let totalPoints = 0

    for (let key in selection) {
      totalPoints += selection[key]
    }

    if (
      parseFloat(totalPoints) >= 12 ||
      parseFloat(periodIsLate) ||
      parseFloat(unprotectedSex)
    ) {
      if (plannedPregnancy) {
        setCorrectAnswerId(1)
      } else {
        setCorrectAnswerId(2)
      }
    } else {
      setCorrectAnswerId(3)
    }

    setSectionType("answer")
  }

  return (
    <section id="pregnancy-quiz">
      <Container className="page-section pt-0 pregnancy-quiz">
        <Row className="m-0">
          <Col xs={12} lg={6} className="p-0">
            <section className="quiz-holder">
              {sectionType === "question" && (
                <>
                  {quizzes.map(item => (
                    <QuizQuestion
                      next={next}
                      previous={previous}
                      current={questionNumber}
                      question={item?.node?.quiz?.question}
                      id={item?.node?.quiz?.priorityOrder}
                    >
                      {item?.node?.quiz?.options?.map(option => (
                        <QuizOption
                          onChange={handleOptionChange}
                          selection={selection}
                          selectedIds={selectedIds}
                          questionId={item?.node?.quiz?.priorityOrder}
                          answerId={option?.answerId}
                          value={option?.value || 0}
                          label={option?.label}
                          type={option?.type}
                        />
                      ))}
                    </QuizQuestion>
                  ))}

                  <section className="quiz-nav">
                    {questionNos.map(item => (
                      <span
                        key={item}
                        className={item === questionNumber ? "active" : ""}
                      ></span>
                    ))}
                  </section>

                  {error && (
                    <section className="selection-error">
                      <section className="alert alert-warning">
                        {errorMessage?.node?.title}
                      </section>
                    </section>
                  )}
                </>
              )}

              {sectionType === "answer" && (
                <>
                  {quizResults?.map(result => (
                    <QuizAnswer
                      id={result?.node?.generic_block_data?.priorityOrder}
                      answer={correctAnswerId}
                    >
                      <section
                        dangerouslySetInnerHTML={{
                          __html: result?.node?.content,
                        }}
                      />
                    </QuizAnswer>
                  ))}
                </>
              )}
            </section>
          </Col>
          <Col xs={12} lg={6} className="p-0 d-none d-lg-flex">
            <section className="quiz-background">
              <img src={imageUrl} alt="" loading="lazy" />
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PregnancyQuiz
