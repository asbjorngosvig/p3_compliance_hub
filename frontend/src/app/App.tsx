
import '../shared/styles/App.css'
import { Button } from '../shared/components/Buttons';
import Sidebar from '../shared/components/Sidebar';
import { useState } from 'react'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <>
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        toggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div>
        <Button variant="black">Test button black</Button>
        <Button variant="blue">Test button blue</Button>
      </div>
    </>
  )
}

export default App
