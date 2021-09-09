import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { playAgain, currentIndex, correctAnswers, questions } =
    useGlobalContext()
  const [percent, setPercent] = useState(0)

  const isFinished =
    questions.length > 0 ? currentIndex > questions.length - 1 : false

  useEffect(() => {
    const ratio = (100 / currentIndex) * correctAnswers
    if (ratio) {
      setPercent(ratio)
    } else {
      return
    }
    // eslint-disable-next-line
  }, [isFinished])

  return (
    <div className={`modal-container ${isFinished && 'isOpen'}`}>
      <div className='modal-content'>
        <h2>congrats</h2>
        <p>You answered {percent} % of questions correctly</p>
        <button className='close-btn' onClick={playAgain}>
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal
