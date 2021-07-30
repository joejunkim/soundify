import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import SignupFormModal from '../SignupFormModal';
import "./LoginForm.css";

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div id='login__form'>
      <h1>Soundify</h1>
      <form onSubmit={handleSubmit}>
        <div id='login__form-info'>
          Email or Username
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
              ))}
          </ul>
        </div>
        <div id='login__form-bottom'>
          <button type="submit">Log In</button>
          <div id='login__form-signup'>
            Don't have an account?
            <SignupFormModal />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
