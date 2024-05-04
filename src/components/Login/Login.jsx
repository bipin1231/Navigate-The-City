import React, { useState, useEffect } from "react";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, such as sending data to a server
    console.log("Email:", email);
    console.log("Password:", password);
    // Close the login form after submission
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between font-bold mb-3">
            <p>Login</p>

            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            logIn
          </button>
          <div>
            <p>Don't have an Account?</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
