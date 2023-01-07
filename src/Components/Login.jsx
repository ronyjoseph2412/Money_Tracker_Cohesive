import React from 'react'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import env from 'react-dotenv';
export const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch((env.API_URL + 'login'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": email,
                "password": password,
            })
        });
        const content = await response.json();
        console.log(content);
        if(content.hasOwnProperty('token')){
            localStorage.setItem('token', "Token "+ content.token);
            window.location.href = '/';
        }
        else{
            window.alert("Something went Wrong")
        }
    }
    return (
        <div className="auth-wrapper" id='id'>
            <div className="auth-inner">
                <form>
                    <h3>Log In</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                 Remember me
                            </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" onClick={handleClick} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <a href='signup' className="forgot-password text-right">
                        Signup?
                    </a>
                </form>
            </div>
        </div>
    )
}
