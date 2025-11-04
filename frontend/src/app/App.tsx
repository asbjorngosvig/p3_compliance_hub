//import { useState } from 'react'
import '../shared/styles/App.css'
import { Button } from '../shared/components/Buttons';
import Navbar from '../shared/components/Navbar';

// test
function App() {
 // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <div>
        <Button variant="black">Test button black</Button>
        <Button variant="blue">Test button blue</Button>
      </div>
    </>
  )
}

export default App
