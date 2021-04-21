import { useState, useEffect, StrictMode } from "react";
import ReactDOM from "react-dom";
import "./Dashboard.sass";
import noImg from "../../assets/noImg.png";
import AddUserModal from "../addUserModal/AddUserModal";
import TodoModal from "../todoModal/TodoModal";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [addUserModal, setAddUserModal] = useState(false);
    const [todoModal, setTodoModal] = useState(false);

    const getUsers = () => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch("http://localhost:5000/getUsers", {
                method: "GET",
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => setUsers(res));
        }
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        ReactDOM.render(
            <StrictMode>
                {addUserModal && (
                    <AddUserModal
                        setUsers={setUsers}
                        setAddUserModal={setAddUserModal}
                    />
                )}
                {todoModal && (
                    <TodoModal
                        setTodoModal={setTodoModal}
                        user={user}
                        setUser={setUser}
                        users={users}
                        setUsers={setUsers}
                    />
                )}
            </StrictMode>,
            document.getElementById("modal")
        );
        // eslint-disable-next-line
    }, [addUserModal, todoModal]);

    if (addUserModal || todoModal) {
        document.getElementById("root").style.opacity = "0.1";
        document.body.classList.add("modal-open");
        document.getElementById("root").style.pointerEvents = "none";
    } else {
        document.getElementById("root").style.opacity = "1";
        document.body.classList.remove("modal-open");
        document.getElementById("root").style.pointerEvents = "auto";
    }

    const openTodoModal = (user) => {
        setTodoModal(true);

        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-navbar-container">
                <div className="dashboard-navbar">
                    <button
                        className="dashboard-navbar-adduser"
                        onClick={() => setAddUserModal(true)}
                    >
                        Add User
                    </button>
                    <button
                        className="dashboard-navbar-logout"
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="dashboard-users">
                {users &&
                    users.map((user, key) => (
                        <div
                            className="dashboard-user-card"
                            key={key}
                            onClick={() => openTodoModal(user)}
                        >
                            {!user.image ? (
                                <img
                                    src={noImg}
                                    alt="no-profile-pic"
                                    className="dashboard-image"
                                />
                            ) : (
                                <img
                                    src={user.image}
                                    alt="profile-pic"
                                    className="dashboard-image"
                                />
                            )}
                            <p className="dashboard-username">
                                {user.username}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;
