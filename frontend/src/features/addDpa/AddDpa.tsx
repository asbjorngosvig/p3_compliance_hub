import { Dpaform } from "./Dpaform";
import { AddDpaPreview } from "./AddDpaPreview";

export function AddDpa() {
    return (
        <div className="flex justify-items-start gap-10">
            <Dpaform />
            <AddDpaPreview />
        </div>
    );
}

export default AddDpa;
