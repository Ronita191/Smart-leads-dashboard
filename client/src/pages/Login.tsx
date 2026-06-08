import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // 


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", res.data);
      console.log("LOGIN RESPONSE:", res.data);
      alert("Login successful!");
      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // SAVE ROLE
      localStorage.setItem("role", res.data.user.role);
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            🔒
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <span className="text-gray-400 mr-2">📧</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <span className="text-gray-400 mr-2">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 text-sm"
              >
                👁
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="my-5 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
