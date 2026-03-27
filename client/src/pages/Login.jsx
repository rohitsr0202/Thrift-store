import React, { useState ,useEffect} from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(form);

    localStorage.setItem("userInfo", JSON.stringify(data));

    alert("Login successful 🔥");

    // 👇 redirect to home
    navigate("/home");

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};


useEffect(() => {
  const user = localStorage.getItem("userInfo");

  if (user) {
    navigate("/home");
  }
}, []);

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;