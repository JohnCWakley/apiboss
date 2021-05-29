import { useState } from "react";

export default function SignIn(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ remember, setRemember ] = useState(false);

    const onSubmit = (evt) => {
        evt.preventDefault();

        fetch('/api/sign-in', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }).then(res => console.debug('response:', res));
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(evt) => setEmail(evt.target.value)} autoComplete="current-email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(evt) => setPassword(evt.target.value)} autoComplete="current-password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={() => setRemember(!remember)} />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>

            <p className="forgot-password text-right">
                Forgot <a href="/forgot">password?</a>
            </p>
        </form>
    );
}