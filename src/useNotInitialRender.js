const useNotInitialRender = (fn, dependency) => {
  const initialState = React.useRef(false)

  useEffect(() => {
    if (initialState.current) {
      fn()
    } else {
      initialState.current = true
    }
  }, dependency)
}
