
import '../shared/styles/App.css'
import { Button } from '../shared/components/Buttons';
import Sidebar from '../shared/components/Sidebar';

function App() {

  return (
    <>
      <Sidebar />

      <div>
        <Button variant="black">Test button black</Button>
        <Button variant="blue">Test button blue</Button>
      </div>
    </>
  )
}

export default App
