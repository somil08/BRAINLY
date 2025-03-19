import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
      alert("You have signed up successfully!");
      navigate("/signin");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center">
      <div className="bg-white shadow-xl border border-gray-300 rounded-3xl px-12 py-14 w-[450px] 
        transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:border-gray-400 hover:scale-105">
        
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium bg-red-100 p-2 rounded-md mb-4">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Username
            </label>
            <Input
              reference={usernameRef}
              placeholder="Enter your username"
              className="py-3 text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-xl transition-all"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Password
            </label>
            <Input
              reference={passwordRef}
              type="password"
              placeholder="Enter your password"
              className="py-3 text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-xl transition-all"
            />
          </div>
          
          <div className="pt-6">
            <Button
              onClick={signup}
              loading={loading}
              variant="primary"
              text={loading ? "Signing Up..." : "Sign Up"}
              fullwidth={true}
              className="py-3 text-lg rounded-xl"
            />
          </div>

          <p className="text-lg text-center text-gray-500 pt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 font-semibold hover:underline transition">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
