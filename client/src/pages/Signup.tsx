import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  //Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Loading state
  const [loading, setLoading] = useState(false); 

  // Handle user signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true); 

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role: "employee",
        }
      );

      console.log("Signup Success:", res.data); 

      alert(res.data.message || "Signup Successful"); 


      // Redirect to login page
      navigate("/login");

    } catch (err: any) {
      console.log("Signup Error:", err.response?.data || err.message);

      alert(err.response?.data?.message || "Signup Failed"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Creating Account..." : "Signup"}  
          </button>

        </form>

        {/* Redirect to Login */}
        <p
          className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
};

export default Signup;