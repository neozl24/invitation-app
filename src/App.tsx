import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-3xl font-bold text-neutral-800">
        This is a Demo
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
