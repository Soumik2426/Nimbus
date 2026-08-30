import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-8">
      <Outlet />
    </main>
  );
}

export default AuthLayout;