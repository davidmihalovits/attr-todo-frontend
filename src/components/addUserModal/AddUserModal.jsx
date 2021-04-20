import { useState } from "react";
import "./AddUserModal.sass";
import close from "../../assets/close.svg";

const AddUserModal = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addUser = (e) => {
        e.preventDefault();

        setLoading(true);

        const token = localStorage.getItem("token");

        if (token) {
            fetch("http://localhost:5000/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (
                        res.status === "Enter a username." ||
                        "Password must be at least 6 characters." ||
                        "Username already taken."
                    ) {
                        setError(res.status);
                        setLoading(false);
                    }
                    if (res.newUser) {
                        setLoading(false);
                        setError("");
                        props.setAddUserModal(false);
                        props.setUsers((oldUsersArray) => [
                            res.newUser,
                            ...oldUsersArray,
                        ]);
                    }
                });
        }
    };

    /*const useOnClick = (ref, handler) => {
        useEffect(() => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
            };
            // eslint-disable-next-line
        }, []);
    };
    const ref = useRef();
    useOnClick(ref, () => {
        props.setAddUserModal(false);
    });*/

    const disabled = username.length === 0 || password.length === 0 || loading;

    return (
        <div className="addusermodal-container">
            <div className="addusermodal-title-close">
                <h1 className="addusermodal-title">Add User</h1>
                <img
                    src={close}
                    alt="close"
                    className="addusermodal-close"
                    onClick={() => props.setAddUserModal(false)}
                />
            </div>
            <form className="addusermodal-form" onSubmit={addUser} noValidate>
                <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="addusermodal-input"
                />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="addusermodal-input"
                />
                <button
                    type="submit"
                    disabled={disabled}
                    className="addusermodal-button"
                >
                    {loading ? "Loading..." : "Add User"}
                </button>
                {error && <p className="addusermodal-error">{error}</p>}
            </form>
        </div>
    );
};

export default AddUserModal;
