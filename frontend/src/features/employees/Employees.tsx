import { useMemo, useState, type FormEvent } from "react";

type Role = "Admin" | "Editor" | "Viewer";

type Employee = {
    id: number;
    name: string;
    email: string;
    role: Role;
    canManageDpas: boolean;
    status: "Active" | "Invited" | "Suspended";
};

const initialEmployees: Employee[] = [
    {
        id: 1,
        name: "Sune (CTO)",
        email: "sune@uniwise.eu",
        role: "Admin",
        canManageDpas: true,
        status: "Active",
    },
    {
        id: 2,
        name: "Data Protection Officer",
        email: "dpo@uniwise.eu",
        role: "Admin",
        canManageDpas: true,
        status: "Active",
    },
    {
        id: 3,
        name: "Support",
        email: "support@uniwise.eu",
        role: "Viewer",
        canManageDpas: false,
        status: "Active",
    },
];

export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<Role>("Viewer");
    const [canManageDpas, setCanManageDpas] = useState(false);

    const handleAddEmployee = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert("Please fill in both name and email.");
            return;
        }

        const newEmployee: Employee = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            role,
            canManageDpas,
            status: "Invited",
        };

        setEmployees((prev) => [newEmployee, ...prev]);

        // reset form
        setName("");
        setEmail("");
        setRole("Viewer");
        setCanManageDpas(false);

        alert("Employee added (mock) – remember: this is frontend only.");
    };

    const handleToggleAdmin = (id: number) => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === id
                    ? {
                        ...emp,
                        role: emp.role === "Admin" ? "Viewer" : "Admin",
                        canManageDpas: emp.role !== "Admin", // hvis vi fjerner admin → ingen DPA access
                    }
                    : emp
            )
        );
    };

    const handleRemove = (id: number) => {
        const emp = employees.find((e) => e.id === id);
        if (!emp) return;

        const ok = window.confirm(
            `Remove ${emp.name} from ComplianceHub? This cannot be undone (mock).`
        );
        if (!ok) return;

        setEmployees((prev) => prev.filter((e) => e.id !== id));
    };

    const filteredEmployees = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return employees;
        return employees.filter(
            (e) =>
                e.name.toLowerCase().includes(q) ||
                e.email.toLowerCase().includes(q) ||
                e.role.toLowerCase().includes(q)
        );
    }, [employees, search]);

    return (
        <div className="flex flex-col gap-6 px-8 py-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Control who has access to ComplianceHub and who can administer DPAs.
                    </p>
                </div>
            </div>

            {/* Add employee form */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">
                        Invite new employee
                    </h2>
                    <p className="text-xs text-gray-500">
                        New employees will be created as &quot;Invited&quot; (mock).
                    </p>
                </div>

                <form
                    onSubmit={handleAddEmployee}
                    className="grid grid-cols-1 gap-4 md:grid-cols-4"
                >
                    <div className="md:col-span-1">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="e.g. Sune Andersen"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="sune@uniwise.eu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                    </div>

                    <div className="flex flex-col justify-between md:col-span-1">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                            DPA permissions
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                id="canManageDpas"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 checked:bg-indigo-600 checked:border-indigo-600"
                                checked={canManageDpas}
                                onChange={(e) => setCanManageDpas(e.target.checked)}
                            />

                            <label
                                htmlFor="canManageDpas"
                                className="text-xs text-gray-700"
                            >
                                Can create / edit DPAs
                            </label>
                        </div>

                        <div className="mt-3 flex justify-end md:mt-0">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                            >
                                Add employee
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Search + table */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search employees"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 pl-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <span className="text-xs text-gray-500">
            Showing: {filteredEmployees.length} employees
          </span>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                Role
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                DPA access
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                        {filteredEmployees.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-6 text-center text-sm text-gray-500"
                                >
                                    No employees match your search.
                                </td>
                            </tr>
                        )}

                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                                    {emp.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                                    {emp.email}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                                    {emp.role}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                    {emp.canManageDpas ? (
                                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        Can manage DPAs
                      </span>
                                    ) : (
                                        <span className="inline-flex rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                        View only
                      </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                    {emp.status === "Active" && (
                                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        Active
                      </span>
                                    )}
                                    {emp.status === "Invited" && (
                                        <span className="inline-flex rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                        Invited
                      </span>
                                    )}
                                    {emp.status === "Suspended" && (
                                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                        Suspended
                      </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleAdmin(emp.id)}
                                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                                        >
                                            {emp.role === "Admin" ? "Remove admin" : "Make admin"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(emp.id)}
                                            className="text-xs font-medium text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
