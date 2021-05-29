export default function SignUp(props) {
    return (
        <form autoComplete="off">
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" autoComplete="new-password" />
            </div>

            <div className="form-group">
                <label>Password Again</label>
                <input type="password" className="form-control" placeholder="Enter password" autoComplete="new-password" />
            </div><br/>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    );
}