import {
  START_QUIZ,
  FINISH_PREPARATION,
  CHANGE_INPUT,
  SELECT_ANSWER,
  PLAY_AGAIN,
} from './actions'

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case START_QUIZ:
      return {
        ...state,
        loading: true,
        isError: false,
        startToggle: !state.startToggle,
      }
    case FINISH_PREPARATION:
      if (payload.length < 1) {
        return { ...state, loading: false, isError: true }
      }
      return { ...state, loading: false, questions: payload }
    case CHANGE_INPUT:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [payload.inputName]: payload.inputValue,
        },
      }
    case SELECT_ANSWER:
      const correctAnswers = payload
        ? state.correctAnswers + 1
        : state.correctAnswers
      return { ...state, currentIndex: state.currentIndex + 1, correctAnswers }
    case PLAY_AGAIN:
      return {
        ...state,
        currentIndex: 0,
        correctAnswers: 0,
        questions: [],
      }
    default:
      throw new Error(`No action type matching with ${type}`)
  }
}

export default reducer
