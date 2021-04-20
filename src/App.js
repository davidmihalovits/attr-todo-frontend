import "./App.sass";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
