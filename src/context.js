import axios from 'axios'
import React, { useContext, useEffect, useReducer, useRef } from 'react'

import reducer from './reducer'

import {
  START_QUIZ,
  FINISH_PREPARATION,
  CHANGE_INPUT,
  SELECT_ANSWER,
  PLAY_AGAIN,
} from './actions'

export const table = {
  movies: 11,
  'video games': 15,
  computers: 18,
  animals: 27,
  'anime & manga': 31,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const initialState = {
  loading: false,
  inputValues: {
    amount: 10,
    category: 'movies',
    type: 'mixed',
    difficulty: 'easy',
  },
  startToggle: false,
  questions: [],
  currentIndex: 0,
  correctAnswers: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const initialRender = useRef(false)

  const changeInput = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    dispatch({ type: CHANGE_INPUT, payload: { inputName, inputValue } })
  }

  const startQuiz = () => {
    dispatch({ type: START_QUIZ })
  }

  const selectAnswer = (isTrue) => {
    dispatch({ type: SELECT_ANSWER, payload: isTrue })
  }

  const playAgain = () => {
    dispatch({ type: PLAY_AGAIN })
  }

  const fetchQuestions = async (url) => {
    const response = await axios.get(url)
    dispatch({ type: FINISH_PREPARATION, payload: response.data.results })
  }

  useEffect(() => {
    if (initialRender.current) {
      const { amount, category, type, difficulty } = state.inputValues
      const url = `${API_ENDPOINT}amount=${amount}&category=${
        table[category]
      }&type=${type === 'mixed' ? '' : type}&difficulty=${difficulty}`
      fetchQuestions(url)
    } else {
      initialRender.current = true
    }
    // eslint-disable-next-line
  }, [state.startToggle])

  return (
    <AppContext.Provider
      value={{
        ...state,
        changeInput,
        startQuiz,
        selectAnswer,
        playAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
