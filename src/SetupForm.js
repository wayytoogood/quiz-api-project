import React from 'react'
import { useGlobalContext } from './context'
import { table } from './context'
import { decode } from 'html-entities'

const SetupForm = () => {
  const {
    inputValues,
    changeInput,
    startQuiz,
    questions,
    currentIndex,
    correctAnswers,
    selectAnswer,
  } = useGlobalContext()

  if (questions.length > 0) {
    const isFinished = currentIndex > questions.length - 1
    const currentQuestion = isFinished
      ? questions[currentIndex - 1]
      : questions[currentIndex]
    let { correct_answer, incorrect_answers } = currentQuestion
    incorrect_answers = incorrect_answers.map((answer) => {
      return { state: false, value: answer }
    })
    const answers = [
      ...incorrect_answers,
      { state: true, value: correct_answer },
    ]

    let shuffleRate = answers.length
    let shuffledAnswers = []

    while (shuffleRate > 0) {
      const random = Math.floor(Math.random() * shuffleRate)
      const selected = answers.splice(random, 1)
      shuffledAnswers.push(...selected)
      shuffleRate--
    }

    return (
      <main>
        <section className='quiz'>
          <p className='correct-answers'>
            correct answers {correctAnswers} / {isFinished ? 0 : currentIndex}
          </p>
          <article className='container'>
            <h2>{decode(currentQuestion.question)}</h2>
            <div className='btn-container'>
              {shuffledAnswers.map((answer, index) => {
                const { state, value } = answer
                return (
                  <button
                    key={index}
                    className='answer-btn'
                    onClick={() => selectAnswer(state)}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </article>
          <button className='next-question' onClick={() => selectAnswer(false)}>
            next question
          </button>
        </section>
      </main>
    )
  }

  let categories = []
  for (let prop in table) {
    categories.push(prop)
  }

  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form' onSubmit={(e) => e.preventDefault()}>
          <h2>setup quiz</h2>
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              className='form-input'
              type='number'
              name='amount'
              id='amount'
              min='1'
              max='50'
              value={inputValues.amount}
              onChange={changeInput}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={inputValues.category}
              onChange={changeInput}
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='type'>type</label>
            <select
              name='type'
              id='type'
              className='form-input'
              value={inputValues.type}
              onChange={changeInput}
            >
              <option value='mixed'>mixed</option>
              <option value='multiple'>multiple choice</option>
              <option value='boolean'>true / false</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={inputValues.difficulty}
              onChange={changeInput}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          <button type='submit' className='submit-btn' onClick={startQuiz}>
            start
          </button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
