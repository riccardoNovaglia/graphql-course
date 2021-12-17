import React, { useState } from "react";
import { login } from "./auth";
import { useHistory } from "react-router-dom";

export function LoginForm({ onLogin }) {
  const [error, setError] = useState(false);
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    const {
      email: { value: emailValue },
      password: { value: passwordValue },
    } = e.target;
    login(emailValue, passwordValue).then((ok) => {
      if (ok) {
        onLogin();
        history.push("/");
      } else {
        setError(true);
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" name="email" />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" name="password" />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && "Invalid credentials"}</p>
        <div className="control">
          <input type="submit" value="Login" className="button is-link" />
        </div>
      </div>
    </form>
  );
}
