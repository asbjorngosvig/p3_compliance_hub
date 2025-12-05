import { NavLink, useNavigate, Link } from "react-router-dom";
import {
    HomeIcon,
    DocumentTextIcon,
    Cog6ToothIcon,
    UserIcon,
    ArrowRightEndOnRectangleIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "./Logo";
import { Button } from "./Buttons.tsx";
import { authService } from "../services/AuthService.ts";

type SidebarItem = {
    name: string;
    to: string;
    icon?: React.ElementType;
};

const navigation: SidebarItem[] = [
    { name: "Home", to: "dashboard", icon: HomeIcon },
    { name: "Data Processors", to: "dataprocessors", icon: DocumentTextIcon },
    { name: "Employees", to: "employees", icon: UserIcon },
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export function Sidebar({
                            isCollapsed,
                            toggle,
                        }: {
    isCollapsed: boolean;
    toggle: () => void;
}) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate("/");
        } catch (err) {
            alert("Failed logout");
            console.error(err);
        }
    };

    return (
        <aside
            className={classNames(
                "h-screen bg-white flex flex-col transition-all duration-300 ease-in-out flex-shrink-0",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            {/* Top section */}
            <div
                className={classNames(
                    "flex items-center h-16 border-b border-black/10 px-2 transition-all",
                    isCollapsed ? "justify-center" : "justify-between"
                )}
            >
                {!isCollapsed && (
                    <Link to="dashboard" className="mx-auto w-full">
                        <Logo
                            showTitle
                            title="ComplianceHub"
                            titleSize="medium"
                            logoSize="medium"
                            className="mx-auto max-w-[85%]"
                            imgClassName="h-[min(12cqh,24px)]"
                            titleClassName="text-center"
                        />
                    </Link>
                )}

                <button
                    onClick={toggle}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="p-1 rounded hover:bg-black/5 transition"
                >
                    <ListBulletIcon className="text-black h-7 w-7 flex-shrink-0 hover:text-[#6A42AB]" />
                </button>
            </div>

            {/* Middle section */}
            <nav className="flex-1 mt-6 px-2 space-y-1 overflow-y-auto">
                {navigation.map(({ name, to, icon: Icon }) => (
                    <NavLink
                        key={name}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            classNames(
                                isActive
                                    ? "bg-[#D4DFE6] text-[#2A5D83]"
                                    : "text-black hover:bg-black/5 hover:text-black",
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isCollapsed ? "justify-center gap-0" : "gap-2"
                            )
                        }
                    >
                        {Icon && (
                            <Icon
                                className="h-5 w-5 flex-shrink-0"
                                aria-hidden="true"
                            />
                        )}
                        {!isCollapsed && <span className="truncate">{name}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="border-t border-black/10 p-3 flex flex-col space-y-3">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? "bg-[#D4DFE6] text-[#2A5D83]"
                                : "text-black hover:text-black hover:bg-black/5",
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isCollapsed ? "justify-center gap-0" : "gap-2"
                        )
                    }
                >
                    <Cog6ToothIcon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                    />
                    {!isCollapsed && <span>Settings</span>}
                </NavLink>

                <Button
                    variant={"primary"}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}
                    className="flex justify-center !bg-transparent !border-none !shadow-none !p-0 !m-0 hover:!bg-transparent"
                >
                    <ArrowRightEndOnRectangleIcon
                        className="text-black h-5 w-5 hover:text-[#6A42AB] transition"
                        aria-hidden="true"
                    />
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;
