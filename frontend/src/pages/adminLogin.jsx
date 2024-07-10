import React from "react";

const adminLogin = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-teal-700">
        <div>
          <h1>Admin Login</h1>
          <form>
            <label htmlFor="email">email</label>
            <input
              type="email"
              placeholder="Enter you Email"
              autoComplete="email"
            />
            <label htmlFor="email">email</label>
            <input
              type="password"
              placeholder="Enter you Password"
              autoComplete="password"
            />
            <button>Sign In</button>
          </form>
        </div>
      </div>

    </React.Fragment>
  );
};

export default adminLogin;
