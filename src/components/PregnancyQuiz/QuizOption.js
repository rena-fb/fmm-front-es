import React from "react"

const QuizOption = ({
  questionId,
  answerId,
  value,
  label,
  type = "radio",
  onChange,
  selectedIds,
}) => {
  const id = `q${questionId}a${answerId}`

  return (
    <section className="form-check quiz-option">
      <label>
        <input
          className="form-check-input"
          name={questionId}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          checked={selectedIds[parseInt(questionId)] === id}
        />
        <span className="form-check-label">{label}</span>
      </label>
    </section>
  )
}

export default QuizOption
