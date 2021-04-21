import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import "./TodoModal.sass";
import close from "../../assets/close.svg";
import noImg from "../../assets/noImg.png";
import deleteTodoSvg from "../../assets/delete.svg";

// edit todo

const TodoModal = (props) => {
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(props.user);
    const [todo, setTodo] = useState("");
    const [todoTextArea, setTodoTextArea] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    const getTodos = () => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:5000/getTodos/${props.user.id}`, {
                method: "GET",
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => setTodos(res));
        }
    };

    useEffect(() => {
        getTodos();
        // eslint-disable-next-line
    }, []);

    const updateUser = (u) => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:5000/updateUser/${props.user.id}`, {
                method: "PUT",
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: u,
                    username: newUsername,
                }),
            })
                .then((res) => res.json())
                .then((res) =>
                    props.users.map((user) => {
                        if (props.user.id === res.user.id) {
                            var data = [...props.users];
                            var index = data.findIndex(
                                (obj) => obj.id === props.user.id
                            );
                            data[index] = res.user;
                            props.setUsers(data);
                            setUser(res.user);
                            setEditUser(false);
                        }
                        return user;
                    })
                );
        }
    };

    const imageOnChange = (e) => {
        const image = e.target.files[0];

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        const u = url;
                        updateUser(u);
                    });
            }
        );
    };

    const deleteTodo = (id) => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:5000/deleteTodo/${id}`, {
                method: "DELETE",
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    let filteredArray = todos.filter((todo) => todo.id !== id);
                    setTodos(filteredArray);
                });
        }
    };

    const deleteUser = () => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:5000/deleteUser/${user.id}`, {
                method: "DELETE",
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    props.setTodoModal(false);
                    let filteredArray = props.users.filter(
                        (u) => u.id !== user.id
                    );
                    props.setUsers(filteredArray);
                });
        }
    };

    const addTodo = () => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:5000/addTodo`, {
                method: "POST",
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo: todo,
                    userid: user.id,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setTodos((oldTodosArray) => [res, ...oldTodosArray]);
                    setTodo("");
                });
        }
    };

    return (
        <div className="todomodal-container">
            <div className="todomodal-close-container">
                <img
                    src={close}
                    alt="close"
                    className="todomodal-close"
                    onClick={() => props.setTodoModal(false)}
                />
            </div>
            <div className="todomodal-image-username">
                <input
                    style={{ display: "none" }}
                    name="image"
                    id="image"
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    value={""}
                    onChange={imageOnChange}
                />
                <label className="todomodal-label" htmlFor="image">
                    {!user.image ? (
                        <img
                            src={noImg}
                            alt="no-profile-pic"
                            className="todomodal-image"
                        />
                    ) : (
                        <img
                            src={user.image}
                            alt="profile-pic"
                            className="todomodal-image"
                        />
                    )}
                </label>
                {editUser ? (
                    <input
                        placeholder="Username"
                        id="username"
                        name="username"
                        type="username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="todomodal-input"
                    />
                ) : (
                    <p className="todomodal-username">{user.username}</p>
                )}
            </div>
            <div className="todomodal-buttons">
                <button
                    className="todomodal-button-delete"
                    onClick={() => deleteUser()}
                >
                    Delete
                </button>
                {editUser ? (
                    <button
                        className="todomodal-button-finish"
                        onClick={() => updateUser()}
                    >
                        Finish
                    </button>
                ) : (
                    <button
                        className="todomodal-button-edit"
                        onClick={() => setEditUser(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
            <hr className="todomodal-line" />
            <button
                className="todomodal-button-addtodo"
                onClick={() => setTodoTextArea(!todoTextArea)}
            >
                Add Todo
            </button>
            {todoTextArea && (
                <div className="todomodal-textarea-send">
                    <textarea
                        id="addtodo"
                        name="addtodo"
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="todomodal-textarea"
                    />
                    <button
                        className="todomodal-send"
                        onClick={() => addTodo()}
                        disabled={!todo}
                    >
                        ADD
                    </button>
                </div>
            )}
            <div className="todomodal-todos">
                {todos &&
                    todos.map((todo, key) => (
                        <div className="todomodal-todo-delete" key={key}>
                            <p className="todomodal-todo">{todo.todo}</p>
                            <img
                                src={deleteTodoSvg}
                                alt="delete-todo"
                                className="todomodal-delete"
                                onClick={() => deleteTodo(todo.id)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TodoModal;
