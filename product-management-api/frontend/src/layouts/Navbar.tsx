import {
  Bell,
  LogOut,
  Search,
  UserCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">

      {/* Left */}

      <div className="flex items-center gap-6">

        <h1 className="text-xl font-bold tracking-tight text-indigo-600">
          Nimbus
        </h1>

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="rounded-full p-2 transition hover:bg-gray-100">

          <Bell size={20} />

        </button>

        <div className="hidden items-center gap-3 md:flex">

          <UserCircle2
            size={38}
            className="text-indigo-600"
          />

          <div>

            <h3 className="text-sm font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>

            <p className="text-xs text-gray-500">
              {user?.role}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-red-50 hover:text-red-600"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </header>
  );
}

export default Navbar;