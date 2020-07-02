import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div>
      <h1>Login</h1>

      <form>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
    </div>
  );
}
