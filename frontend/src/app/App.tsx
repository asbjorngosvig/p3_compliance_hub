import { useState } from "react";
import '../shared/styles/App.css';
import OverviewHeaderComponent from '../shared/components/OverviewHeader'; // default
import Sidebar from '../shared/components/Sidebar';                               // default
import Dpaform from '../features/add dpa/Dpaform'; // eller '../features/add-dpa/Dpaform'

function App() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <OverviewHeaderComponent />

            <div className="flex justify-center items-start mt-10">
                <Dpaform />
            </div>
        </>
    );
}

export default App;
