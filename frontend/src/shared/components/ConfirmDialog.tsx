import { createContext, useContext, useState, type ReactNode } from "react";

type ConfirmOptions = {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    type?: "success" | "danger" | "info";
};

type ConfirmContextValue = {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined);

export const useConfirm = () => {
    const ctx = useContext(ConfirmContext);
    if (!ctx) {
        throw new Error("useConfirm must be used inside <ConfirmProvider>");
    }
    return ctx.confirm;
};

type Resolver = (value: boolean) => void;

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<Resolver | null>(null);

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

    const confirmColor =
        options?.type === "success"
            ? "bg-[#88AA30] hover:bg-[#BAD377]"
            : options?.type === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700";

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {options && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            {options.title ?? "Are you sure?"}
                        </h2>

                        <p className="text-sm text-gray-600 mb-6">
                            {options.message ?? "This action cannot be undone."}
                        </p>

                        <div className="flex justify-end gap-3">
                            {options.cancelText && (
                                <button
                                    onClick={() => handleClose(false)}
                                    className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                                >
                                    {options.cancelText}
                                </button>
                            )}

                            <button
                                onClick={() => handleClose(true)}
                                className={`px-4 py-2 text-sm rounded-md text-white ${confirmColor}`}
                            >
                                {options.confirmText ?? "OK"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}
