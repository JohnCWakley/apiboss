import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Landing from '../components/landing';
import SignIn from '../components/sign-in';
import SignUp from '../components/sign-up';

export default function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/"}>ApiBoss</Link>

                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-link">
                                    <Link className="nav-link" to={"/sign-up"}>Sign Up</Link>
                                </li>
                                <li>
                                    <Link className="nav-link" to={"/sign-in"}>Sign In</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/' component={Landing} />
                            <Route path="/sign-in" component={SignIn} />
                            <Route path="/sign-up" component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router >
    );
}