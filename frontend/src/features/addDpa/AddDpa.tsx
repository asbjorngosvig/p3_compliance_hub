import { Dpaform } from "./Dpaform";
import { AddDpaPreview } from "./AddDpaPreview";
import { useNavigate } from "react-router-dom";

export function AddDpa() {
    const navigate = useNavigate();

    return (
        <div className="relative flex justify-items-start gap-10 p-4">

            {/* Close (X) button */}
            <button
                onClick={() => navigate("/dpas")}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-500
                           hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Close and return to overview"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Main layout */}
            <Dpaform />
            <AddDpaPreview />
        </div>
    );
}

export default AddDpa;
