import { useEffect, useState } from 'react'
import './styles/app.css'

interface UserProp {
  id: number
  username: string
  email: string
  session: number
}

const App = () => {
  const [state, setState] = useState({ isLoading: false, values: [] })
  useEffect(() => {
    setState((p) => {
      return { ...p, isLoading: true }
    })
    fetch('https://freefakeapi.io/api/users')
      .then((res) => res.json())
      .then((response) => {
        setState({ isLoading: false, values: response })
      })
  }, [])
  return (
    <div style={{ padding: '20px' }}>
      {state.isLoading ? (
        <h2>Loading</h2>
      ) : (
        <div className="flex">
          {state.values.map((item: UserProp) => {
            return (
              <div key={item?.id} className="box">
                <p>Username: {item?.username}</p>
                <p>Email: {item?.email}</p>
                <p>Session: {item?.session}</p>
              </div>
            )
          })}
        </div>
      )}
      <h1>React application</h1>
    </div>
  )
}

export default App
