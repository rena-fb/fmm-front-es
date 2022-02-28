/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react"
import { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import QuizOption from "./ContraceptionQuizOption"
import QuizQuestion from "./ContraceptionQuizQuestion"
import QuizSection from "./ContraceptionQuizSection"
import "./ContraceptionQuiz.scss"

const allMethods = {
  hormonalIud: { name: "Hormonal IUD", index: "01" },
  copperIud: { name: "Non hormonal IUD", index: "02" },
  implant: { name: "Implant", index: "03" },
  pill: { name: "The Pill", index: "04" },
  injectable: { name: "The Injectable", index: "05" },
  patch: { name: "The Patch", index: "06" },
  ring: { name: "The Ring", index: "07" },
  externalCondom: { name: "External Condom", index: "08" },
  internalCondom: { name: "Internal Condom", index: "09" },
  emergencyPills: {
    name: "Emergency Contraception Pills",
    index: "10",
  },
  sterilization: { name: "Sterilization", index: "11" },
  cervicalCap: { name: "Cervical Cap", index: "12" },
  diaphragm: { name: "Diaphragm", index: "13" },
  spermicide: { name: "Spermicide", index: "14" },
  sponge: { name: "Sponge", index: "15" },
  fertilityAwareness: { name: "Fertility Awareness", index: "16" },
  withdrawal: { name: "Withdrawal", index: "17" },
  NotRightNow: { name: "Not Right Now", index: "18" },
}

const ContraceptionQuiz = ({
  suggestedMethodIds,
  setSuggestedMethodIds,
  completed,
  quizzes,
}) => {
  const [sectionNumber, setSectionNumber] = useState(1)
  const sectionNos = [1, 2, 3, 4, 5, 6, 7]
  const [selection, setSelection] = useState({})
  const [sectionOneQuestions, setSectionOneQuestions] = useState([])

  useEffect(() => {
    const result = []

    quizzes.forEach(element => {
      if (element?.node?.quiz?.sectionTitleId === "01") {
        result.push(element?.node?.quiz)
      }
    })

    setSectionOneQuestions(result)
  }, [])

  const countries = [
    "Burkina Faso",
    "Côte d'ivoire",
    "Ghana",
    "India",
    "Liberia",
    "Mali",
    "Mexico",
    "Nigeria",
    "Zambia",
  ]

  const addMethod = methodIds => {
    const existingMethods = [...suggestedMethodIds] || []
    const arr = [...existingMethods]

    methodIds.forEach(id => {
      const existInArray = arr.find(item => item === id.index)
      !existInArray && arr.push(id.index)
    })

    setSuggestedMethodIds(arr)
    return
  }

  const removeMethod = methodIds => {
    const existingMethods = [...suggestedMethodIds] || []
    const arr = [...existingMethods]

    methodIds.forEach(id => {
      const index = arr.findIndex(item => item === id.index)
      index > -1 && arr.splice(index, 1)
    })

    setSuggestedMethodIds(arr)
    return
  }

  const next = () => {
    if (sectionNumber < 7) {
      switch (parseInt(sectionNumber)) {
        default:
          setSectionNumber(() => sectionNumber + 1)
          break

        case 1:
          if (selection[1] && selection[2] && selection[3]) {
            setSectionNumber(() => sectionNumber + 1)
          }
          break

        case 2:
          if (selection[4] === "NotAtAll") {
            addMethod([allMethods.sterilization])
            setSectionNumber(() => sectionNumber + 2)
          } else {
            setSectionNumber(() => sectionNumber + 1)
          }
          break

        case 3:
          if (selection[5] === "Years") {
            addMethod([
              allMethods.hormonalIud,
              allMethods.copperIud,
              allMethods.implant,
            ])
            setSectionNumber(() => sectionNumber + 1)
          } else if (selection[5] === "Months") {
            addMethod([
              allMethods.externalCondom,
              allMethods.internalCondom,
              allMethods.cervicalCap,
              allMethods.diaphragm,
              allMethods.spermicide,
              allMethods.sponge,
              allMethods.fertilityAwareness,
              allMethods.withdrawal,
              allMethods.NotRightNow,
            ])

            setSectionNumber(() => sectionNumber + 1)
          } else {
            setSectionNumber(() => sectionNumber + 1)
          }
          break

        case 4:
          if (selection[6] === "Multiple") {
            addMethod([allMethods.externalCondom, allMethods.internalCondom])
            setSectionNumber(() => sectionNumber + 1)
          } else if (selection[6] === "Sporadic") {
            addMethod([allMethods.emergencyPills])
            setSectionNumber(() => sectionNumber + 1)
          } else {
            setSectionNumber(() => sectionNumber + 1)
          }
          break

        case 5:
          if (selection[7] === "DontCare") {
            addMethod([
              allMethods.hormonalIud,
              allMethods.implant,
              allMethods.pill,
              allMethods.patch,
              allMethods.injectable,
            ])
            setSectionNumber(() => sectionNumber + 1)
          } else if (selection[7] === "SmallDose") {
            addMethod([
              allMethods.pill,
              allMethods.patch,
              allMethods.injectable,
            ])
            removeMethod([allMethods.hormonalIud])
            setSectionNumber(() => sectionNumber + 1)
          } else if (selection[7] === "Cant") {
            removeMethod([
              allMethods.hormonalIud,
              allMethods.implant,
              allMethods.pill,
              allMethods.patch,
              allMethods.injectable,
            ])
            setSectionNumber(() => sectionNumber + 1)
          } else {
            setSectionNumber(() => sectionNumber + 1)
          }
          break

        case 6:
          if (selection[8] === "NotAtAll") {
            removeMethod([
              allMethods.pill,
              allMethods.patch,
              allMethods.injectable,
            ])
            setSectionNumber(() => sectionNumber + 1)
          } else {
            setSectionNumber(() => sectionNumber + 1)
          }
          break

        case 7:
          if (selection[9] === "DontWant") {
            addMethod(
              allMethods.copperIud,
              allMethods.implant,
              allMethods.sterilization
            )
            setSectionNumber(() => sectionNumber + 1)
          } else {
            setSectionNumber(() => sectionNumber + 1)
          }
          break
      }
    } else {
      completed(true)
    }
  }

  const handleOptionChange = e => {
    setSelection(prevState => ({
      ...prevState,
      [parseInt(e?.target?.name)]: e?.target?.value,
    }))
  }

  useEffect(() => {
    next()
  }, [selection])

  return (
    <section className="hero hero--contraception-quiz contraception-quiz">
      <Container>
        <Row>
          <Col xs={12}>
            {quizzes.map(item => (
              <>
                {item?.node?.quiz?.sectionTitleId === "01" &&
                  item?.node?.quiz?.priorityOrder === "01" && (
                    <>
                      <QuizSection
                        id={item?.node?.quiz?.sectionTitleId}
                        current={sectionNumber}
                        title={item?.node?.title}
                        multi
                      >
                        {sectionOneQuestions.map(el => (
                          <QuizQuestion
                            questionId={el?.priorityOrder}
                            question={el?.question}
                          >
                            {el?.options.map(option => (
                              <>
                                {el.priorityOrder === "02" ? (
                                  <section className="contraception-quiz-option">
                                    <select
                                      className="contraception-quiz-option--select"
                                      onChange={handleOptionChange}
                                      name="02"
                                    >
                                      <option disabled selected value="">
                                        {option?.label}
                                      </option>
                                      {countries?.map(country => (
                                        <option value={country}>
                                          {country}
                                        </option>
                                      ))}
                                    </select>
                                  </section>
                                ) : (
                                  <QuizOption
                                    onChange={handleOptionChange}
                                    questionId={el?.priorityOrder}
                                    answerId={option?.answerId}
                                    value={option?.value}
                                    label={option?.label}
                                  />
                                )}
                              </>
                            ))}
                          </QuizQuestion>
                        ))}
                      </QuizSection>
                    </>
                  )}

                {item?.node?.quiz?.sectionTitleId !== "01" && (
                  <QuizSection
                    id={item?.node?.quiz?.sectionTitleId}
                    current={sectionNumber}
                    title={item?.node?.title}
                  >
                    <QuizQuestion questionId={item?.node?.quiz?.priorityOrder}>
                      {item?.node?.quiz?.options.map(option => (
                        <>
                          <QuizOption
                            onChange={handleOptionChange}
                            questionId={item?.node?.quiz?.priorityOrder}
                            answerId={option?.answerId}
                            value={option?.value}
                            label={option?.label}
                          />
                        </>
                      ))}
                    </QuizQuestion>
                  </QuizSection>
                )}
              </>
            ))}

            {/* <>
              <QuizSection
                id="01"
                current={sectionNumber}
                title={titles[0]?.node?.title}
                multi
              >
                <QuizQuestion id="01" question="Gender">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="01"
                    answerId="01"
                    value={"Female"}
                    label="Female"
                  />

                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="01"
                    answerId="02"
                    value={"Male"}
                    label="Male"
                  />

                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="01"
                    answerId="03"
                    value={"NonBinary"}
                    label="Non Binary"
                  />

                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="01"
                    answerId="04"
                    value={"PreferNotToAnswer"}
                    label="Prefer Not To Answer"
                  />

                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="01"
                    answerId="04"
                    value={"PreferToSelfDescribe"}
                    label="Prefer to self-describe"
                  />
                </QuizQuestion>

                <QuizQuestion id="02" question="Country of Residence">
                  <section className="contraception-quiz-option">
                    <select
                      className="contraception-quiz-option--select"
                      onChange={handleOptionChange}
                      name="02"
                    >
                      <option disabled selected value="">
                        Select your country
                      </option>
                      {countries?.map(country => (
                        <option value={country}>{country}</option>
                      ))}
                    </select>
                  </section>
                </QuizQuestion>

                <QuizQuestion id="03" question="Age">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="03"
                    answerId="01"
                    value={"Under18"}
                    label="Under 18"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="03"
                    answerId="02"
                    value={"18To25"}
                    label="18 to 25"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="03"
                    answerId="03"
                    value={"26To35"}
                    label="26 to 35"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="03"
                    answerId="04"
                    value={"36To45"}
                    label="36 to 45"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="03"
                    answerId="05"
                    value={"Over45"}
                    label="Over 45"
                  />
                </QuizQuestion>
              </QuizSection>

              <QuizSection
                id="02"
                current={sectionNumber}
                title={titles[1]?.node?.title}
              >
                <QuizQuestion id="04" question="Choose an option to continue:">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="04"
                    answerId="01"
                    value={"NotAtAll"}
                    label="Not at all"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="04"
                    answerId="02"
                    value={"MaybeSomeday"}
                    label="Maybe, someday"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="04"
                    answerId="02"
                    value={"Yes"}
                    label="Absolutely positive, bring the babies!"
                  />
                </QuizQuestion>
              </QuizSection>

              <QuizSection
                id="03"
                current={sectionNumber}
                title={titles[2]?.node?.title}
              >
                <QuizQuestion id="05" question="Choose an option to continue:">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="05"
                    answerId="01"
                    value={"Years"}
                    label="No rush, maybe in a few years"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="05"
                    answerId="02"
                    value={"Months"}
                    label="In some months or sooner"
                  />
                </QuizQuestion>
              </QuizSection>

              <QuizSection
                id="04"
                current={sectionNumber}
                title={titles[3]?.node?.title}
              >
                <QuizQuestion id="06" question="Choose an option to continue:">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="06"
                    answerId="01"
                    value={"Multiple"}
                    label="Multiple partners"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="06"
                    answerId="02"
                    value={"One"}
                    label="Just one partner"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="06"
                    answerId="03"
                    value={"Sporadic"}
                    label="Sporadic encounters"
                  />
                </QuizQuestion>
              </QuizSection>

              <QuizSection
                id="05"
                current={sectionNumber}
                title={titles[4]?.node?.title}
              >
                <QuizQuestion id="07" question="Choose an option to continue:">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="07"
                    answerId="01"
                    value={"DontCare"}
                    label="I don’t care"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="07"
                    answerId="02"
                    value={"SmallDose"}
                    label="Not sure, maybe small doses?"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="07"
                    answerId="03"
                    value={"Cant"}
                    label="I can’t handle hormones"
                  />
                </QuizQuestion>
              </QuizSection>

              <QuizSection
                id="06"
                current={sectionNumber}
                title={titles[5]?.node?.title}
              >
                <QuizQuestion id="08" question="Choose an option to continue:">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="08"
                    answerId="01"
                    value={"NotAtAll"}
                    label="Not at all"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="08"
                    answerId="02"
                    value={"Yes"}
                    label="Yes"
                  />
                </QuizQuestion>
              </QuizSection>

              <QuizSection
                id="07"
                current={sectionNumber}
                title={titles[6]?.node?.title}
              >
                <QuizQuestion id="09" question="Choose an option to continue:">
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="09"
                    answerId="01"
                    value={"DontWant"}
                    label="I don’t want no one to know about it"
                  />
                  <QuizOption
                    onChange={handleOptionChange}
                    questionId="09"
                    answerId="02"
                    value={"DontMind"}
                    label="I don’t mind"
                  />
                </QuizQuestion>
              </QuizSection>
            </> */}
          </Col>
        </Row>
      </Container>

      <section className="quiz-nav">
        <Container>
          <Row>
            <Col xs={12}>
              {sectionNos.map(item => (
                <span
                  key={item}
                  className={`${item === sectionNumber ? "active" : ""}`}
                ></span>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  )
}

export default ContraceptionQuiz
