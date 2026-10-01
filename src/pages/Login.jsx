import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        try {

            await login(userName, password);

            navigate("/dash/home");

        } catch (err) {

            setError(err.message);

        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Bike Shop</h1>

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;