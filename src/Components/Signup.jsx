import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import { Link } from 'react-router-dom';
import env from 'react-dotenv';
export const Signup = () => {
    const [email, setEmail] = React.useState('');
    const [firstname, setfirstname] = React.useState('');
    const [lastname, setlastname] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [profession, setProfession] = React.useState('');
    const [income, setIncome] = React.useState('');
    const [savings, setsavings] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch((env.API_URL + 'register'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": email,
                "password": password,
                "email": email,
                "first_name": firstname,
                "last_name": lastname,
                "profession":profession,
                "savings":savings,
                "income":income
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
        <div className="auth-wrapper py-2" id='id'>
            <div className="auth-inner">

                <form>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label>First name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            value={firstname}
                            onChange={(e) => setfirstname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name"
                            value={lastname}
                            onChange={(e) => setlastname(e.target.value)}
                        />
                    </div>
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
                        <label>Profession</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Income</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Income"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Savings</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Savings"
                            value={savings}
                            onChange={(e) => setsavings(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/login">Login?</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
