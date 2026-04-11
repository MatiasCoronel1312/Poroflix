import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import homero from './assets/homer.jpg'

import './App.css'
import { Menu } from './Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero"> 
          <img src={viteLogo} className="w-72" alt="Vite logo" />
          <img src={homero} className="w-72" alt="Vite logo" />
        </div>
        <div>
          <h1 className='bg-red-600'>PoroFlix</h1>
          <p>
            <Menu/>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

     
    </>
  )
}

export default App
