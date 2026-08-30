import {
  LayoutDashboard,
  Package,
  User,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-20 items-center justify-center border-b border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-600">
          Nimbus
        </h2>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;