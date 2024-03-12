import { useState } from 'react';
import './index.css';
import { supabase } from '../../superbaseClient';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate=useNavigate();
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    password: '',
  });

  const handleNameChange = (event) => {
    setuserDetails({ ...userDetails, name: event.target.value });
  };
  const handleEmailChange = (event) => {
    setuserDetails({ ...userDetails, email: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setuserDetails({ ...userDetails, password: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userDetails.email,
        password: userDetails.password,
      })
      console.log(data);
      alert('user created successfully');
      navigate('/login')
    } catch (err) {
      console.log(err);
      alert("something went wrong. please try again later")
    }

  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>

          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={userDetails.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={userDetails.password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <p>already have account. <span className="signup" onClick={()=>navigate('/login')}>LOGIN</span> instead</p>

        </div>
      </form>
    </div>
  )
}

export { SignUp }