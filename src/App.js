import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const { loading } = useGlobalContext()

  return (
    <>
      {loading && <Loading />}
      <SetupForm />
      <Modal />
    </>
  )
}

export default App
