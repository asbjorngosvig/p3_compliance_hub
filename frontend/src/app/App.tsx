import { useState } from 'react'
import '../shared/styles/App.css'
import { Button } from '../shared/components/Buttons';
import { Logo } from '../shared/components/Logo';

// test
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Logo width={150} height={150} />
      </div>

      <div>
        <Button variant="black">Test button black</Button>
        <Button variant="blue">Test button blue</Button>
      </div>
    </>
  )
}

export default App
