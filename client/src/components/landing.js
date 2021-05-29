import { Link } from "react-router-dom";

export default function Landing(props) {
    return (
        <div>
            ApiBoss - Coming Soon!<hr/>
            <Link className="navLink" to={"/sign-in"}>Sign In</Link>
        </div>
    );
}