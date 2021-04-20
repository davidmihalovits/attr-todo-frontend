import { useState, useEffect } from "react";
import "./Login.sass";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            history.push("/dashboard");
        }
    });

    const login = (e) => {
        e.preventDefault();

        setLoading(true);

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.token && res.user) {
                    localStorage.setItem("token", res.token);
                    history.push("/dashboard");
                } else if (res.status === "Invalid credentials.") {
                    setError(res.status);
                    setLoading(false);
                }
            });
    };

    const disabled = username.length === 0 || password.length === 0 || loading;

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={login} noValidate>
                <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button
                    type="submit"
                    disabled={disabled}
                    className="login-button"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && <div className="login-error">{error}</div>}
                <Link to="/signup" className="login-link-tosignup">
                    Don't have an account?
                </Link>
            </form>
        </div>
    );
};

export default Login;
