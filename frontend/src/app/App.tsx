import '../shared/styles/App.css'
import {OverviewHeaderComponent} from '../shared/components/OverviewHeaderComponent.tsx';
import '../shared/styles/App.css'
import {Button} from '../shared/components/Buttons';
import Sidebar from '../shared/components/Sidebar';
import {useState} from 'react'

function App() {
    // const [count, setCount] = useState(0);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    return (
        <>


            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <>
                <OverviewHeaderComponent></OverviewHeaderComponent>
            </>
            </>
            )
            }

            export default App;
