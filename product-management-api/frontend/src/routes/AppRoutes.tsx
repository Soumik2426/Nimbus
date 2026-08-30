import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import LandingPage from "../pages/landing/LandingPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import ProductsPage from "../pages/products/ProductsPage";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import CreateProductPage from "../pages/products/CreateProductPage";
import EditProductPage from "../pages/products/EditProductPage";

import ProfilePage from "../pages/profile/ProfilePage";
import SettingsPage from "../pages/settings/SettingsPage";

import ForbiddenPage from "../pages/errors/ForbiddenPage";
import NotFoundPage from "../pages/errors/NotFoundPage";

function AppRoutes() {
    return (
        <Routes>

            {/* Landing Page */}

            <Route
                path="/"
                element={<LandingPage />}
            />

            {/* Authentication */}

            <Route element={<AuthLayout />}>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

            </Route>

            {/* Application */}

            <Route element={<ProtectedRoute />}>

            <Route element={<MainLayout />}>

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route
                    path="/products/:productId"
                    element={<ProductDetailsPage />}
                />

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="/settings"
                    element={<SettingsPage />}
                />

                <Route element={<AdminRoute />}>

                    <Route
                        path="/products/create"
                        element={<CreateProductPage />}
                    />

                    <Route
                        path="/products/edit/:productId"
                        element={<EditProductPage />}
                    />

                </Route>

            </Route>

        </Route>

            <Route
                path="/403"
                element={<ForbiddenPage />}
            />

            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}

export default AppRoutes;