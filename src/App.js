import "./App.sass";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
