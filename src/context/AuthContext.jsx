import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:9080/rest/utente";

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(() => {

        const isLogged = localStorage.getItem("isLogged") === "1";
        const isAdmin = localStorage.getItem("isAdmin") === "1";
        const userId = localStorage.getItem("userId");

        return {
            isLogged,
            isAdmin,
            userId
        };
    });

    const login = async (userName, password) => {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Login non valido");
        }

        const isAdmin = data.role === "ADMIN";

        localStorage.setItem("isLogged", "1");
        localStorage.setItem("userId", data.id);
        localStorage.setItem("isAdmin", isAdmin ? "1" : "0");

        setAuth({
            isLogged: true,
            isAdmin,
            userId: data.id
        });

        return data;
    };

    const logout = () => {

        localStorage.removeItem("isLogged");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        setAuth({
            isLogged: false,
            isAdmin: false,
            userId: null
        });
    };

    const setAdmin = () => {

        localStorage.setItem("isAdmin", "1");

        setAuth(prev => ({
            ...prev,
            isAdmin: true
        }));
    };

    const setUser = () => {

        localStorage.setItem("isAdmin", "0");

        setAuth(prev => ({
            ...prev,
            isAdmin: false
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                login,
                logout,
                setAdmin,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}