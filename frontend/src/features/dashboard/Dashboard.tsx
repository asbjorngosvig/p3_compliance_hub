import {OverviewHeader} from '../../shared/components/OverviewHeader.tsx';
import {Button} from '../../shared/components/Buttons.tsx'

export function Dashboard() {

    return (
        <div>
            <OverviewHeader></OverviewHeader>
            <Button to="/adddpa" variant="green">Add DPA</Button>
        </div>
    );
}

export default Dashboard;