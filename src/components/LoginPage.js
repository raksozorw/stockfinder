import React from "react";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className='login-grid'>
      <Dashboard login={true} />
      <h1 className='watch-header-unloaded'>Your watchlist</h1>
      <section id='login'></section>
      <LoginForm />
    </div>
  );
}
