import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { createLibrary } from '../../store/library'
import LoginFormModal from '../LoginFormModal';
import "./SignupForm.css";

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const libraries = useSelector((state) => Object.values(state.libraries))
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/home" />;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setErrors([]);
        const userId = libraries.length + 1
        dispatch(createLibrary({ userId }))
        return dispatch(sessionActions.signup({ email, username, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      }
      return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
      <div id='signup__form'>
        <h1>Soundify</h1>
        <form onSubmit={handleSubmit}>
          <div id='signup__form-info'>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              />
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div id='signup__form-bottom'>
              <button type="submit">Sign Up</button>
              <div id='signup__form-login'>
                Already have an account?
                <LoginFormModal />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  export default SignupForm;
