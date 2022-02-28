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
    <label className="contraception-quiz-option">
      <input
        name={questionId}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        // checked={selectedIds[parseInt(questionId)] === id}
      />
      <span className="label">{label}</span>
    </label>
  )
}

export default QuizOption
