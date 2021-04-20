import { useState, useEffect } from "react";
import "./Signup.sass";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
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

    const signup = (e) => {
        e.preventDefault();

        setLoading(true);

        fetch("http://localhost:5000/signup", {
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
                } else if (
                    res.status === "Invalid credentials." ||
                    "Enter your username." ||
                    "Password must be at least 6 characters." ||
                    "Username already taken."
                ) {
                    setError(res.status);
                    setLoading(false);
                }
            });
    };

    const disabled = username.length === 0 || password.length === 0 || loading;

    return (
        <div className="signup-container">
            <h1 className="signup-title">Signup</h1>
            <form className="signup-form" onSubmit={signup} noValidate>
                <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="signup-input"
                />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                <button
                    type="submit"
                    disabled={disabled}
                    className="signup-button"
                >
                    {loading ? "Loading..." : "Signup"}
                </button>
                {error && <div className="signup-error">{error}</div>}
                <Link to="/" className="signup-link-tologin">
                    <p className="signup-tologin">Log in here.</p>
                </Link>
            </form>
        </div>
    );
};

export default Signup;
