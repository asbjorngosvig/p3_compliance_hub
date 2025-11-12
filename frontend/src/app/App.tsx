import '../shared/styles/App.css'
import {OverviewHeader} from '../shared/components/OverviewHeader.tsx';
import '../shared/styles/App.css'
import Sidebar from '../shared/components/Sidebar';
import {useState} from 'react'
import Dpaform from '../features/addDpa/Dpaform'; // eller '../features/add-dpa/Dpaform'


function App() {
    // const [count, setCount] = useState(0);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    return (
        <>

            <div className="flex h-screen">
                

                <div
                    className={`flex-1 transition-all duration-300 ${
                        isSidebarCollapsed ? 'pl-16' : 'pl-64'} xl:-mx-20 md:-mx-0`}
                >
                  <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    toggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
                    <OverviewHeader />

                  <Dpaform></Dpaform>

                </div>
            </div>

            </>
            )
            }

            export default App;
