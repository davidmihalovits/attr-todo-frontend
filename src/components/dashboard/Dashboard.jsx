import "./Dashboard.sass";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [users, setUsers] = useState("");

    const getUsers = () => {
        fetch("http://localhost:5000/getUsers", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => setUsers(res));
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-users">
                {users &&
                    users.map((user) => (
                        <div className="dashboard-user">{user}</div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;
