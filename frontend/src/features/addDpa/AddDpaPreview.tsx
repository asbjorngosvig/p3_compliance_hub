export function AddDpaPreview() {
    return (
        <aside className="ml-8 w-[342px]">
            <h2 className="mb-4 text-2xl font-semibold text-black">Preview:</h2>

            <div className="flex flex-col gap-4">
                {/* Preview box */}
                <div className="flex h-[98px] w-full items-center justify-between rounded-xl bg-[#C9483C] px-5 text-white shadow-md">
                    <div>
                        <div className="flex items-center gap-2 text-base font-semibold">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-xs">
                                i
                            </span>
                            <span>Preview</span>
                        </div>
                        <p className="mt-2 text-sm">
                            Violations occurred : 67
                        </p>
                    </div>
                    <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"
                    >
                        <span className="text-lg leading-none">⌄</span>
                    </button>
                </div>

                {/* Action box */}
                <div className="flex h-[98px] w-full items-center justify-between rounded-xl bg-[#E97D24] px-5 text-white shadow-md">
                    <div>
                        <div className="flex items-center gap-2 text-base font-semibold">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-xs">
                                !
                            </span>
                            <span>Action</span>
                        </div>
                        <p className="mt-2 text-sm">
                            Most common: Terminate
                        </p>
                    </div>
                    <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"
                    >
                        <span className="text-lg leading-none">⌄</span>
                    </button>
                </div>

                {/* No violations box */}
                <div className="flex h-[98px] w-full items-center justify-between rounded-xl bg-[#D4DFEC] px-5 text-[#1F2933] shadow-md">
                    <div>
                        <div className="flex items-center gap-2 text-base font-semibold">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#1F2933] text-xs">
                                i
                            </span>
                            <span>No Violations Detected</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5"
                    >
                        <span className="text-lg leading-none">⌄</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default AddDpaPreview;
