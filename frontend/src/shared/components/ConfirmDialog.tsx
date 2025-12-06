import React, { createContext, useContext, useState } from "react";

type ConfirmOptions = {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
};

type ConfirmContextType = {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider");
    return ctx.confirm;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<((result: boolean) => void) | null>(
        null
    );

    const confirm = (opts: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setOptions(opts);
            setResolver(() => resolve);
        });
    };

    const handleClose = (result: boolean) => {
        if (resolver) resolver(result);
        setOptions(null);
        setResolver(null);
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {options && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800">
                            {options.title || "Are you sure?"}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {options.message || "This action cannot be undone."}
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                                onClick={() => handleClose(false)}
                            >
                                {options.cancelText || "Cancel"}
                            </button>

                            <button
                                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                                onClick={() => handleClose(true)}
                            >
                                {options.confirmText || "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}
