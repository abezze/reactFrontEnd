import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

import UserManagement from "./pages/users/UserManagement";
import BikeManagement from "./pages/bikes/BikeManagement";
import ManufacturerManagement from "./pages/manufacturers/ManufacturerManagement";

function App() {
    return (
        <BrowserRouter>
            <div className="app">

                <Navbar />

                <div className="main-layout">

                    <Sidebar />

                    <main className="content">
                        <Routes>

                            {/* Pubblica */}
                            <Route
                                path="/login"
                                element={<Login />}
                            />

                            {/* Area autenticata */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/dash/home"
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/cart"
                                element={
                                    <ProtectedRoute>
                                        <Cart />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Area ADMIN */}
                            <Route
                                path="/dash/visualizzaordini"
                                element={
                                    <AdminRoute>
                                        <Orders />
                                    </AdminRoute>
                                }
                            />

                            <Route
                                path="/dash/user"
                                element={
                                    <AdminRoute>
                                        <UserManagement />
                                    </AdminRoute>
                                }
                            />

                            <Route
                                path="/dash/bike"
                                element={
                                    <ProtectedRoute>
                                        <BikeManagement />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/dash/produttori"
                                element={
                                    <AdminRoute>
                                        <ManufacturerManagement />
                                    </AdminRoute>
                                }
                            />

                        </Routes>
                    </main>

                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;