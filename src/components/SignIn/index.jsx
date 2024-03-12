import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../superbaseClient";
import './index.css'
const SignIn = () => {
    const navigate= useNavigate();
    const [userDetails, setuserDetails] = useState({
        email: "",
        password: '',
    });

    const handleEmailChange = (event) => {
        setuserDetails({ ...userDetails, email: event.target.value });
    };
    const handlePasswordChange = (event) => {
        setuserDetails({ ...userDetails, password: event.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userDetails.email){
            alert("please enter email");
            return;
        }
        if(!userDetails.password){
            alert("please enter password");
            return;
        }
        try {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: userDetails.email,
                password: userDetails.password
            })
            console.log(data);
            navigate('/');
        } catch (error) {
            alert('sommething went wrong. please try again later')
        }
    }
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={userDetails.email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={userDetails.password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                    <p>new user. <span className="signup" onClick={()=>navigate('/signup')}>SIGNUP</span> instead</p>

                </div>
            </form>
        </div>
    )
}
export { SignIn }