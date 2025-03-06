import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
     const response =  await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token",jwt);
      navigate("/dashboard")
    } catch (error) {
      alert("Signin failed. Please try again.");
      console.error(error);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button onClick={signin} loading ={false} variant="primary" text="Signin" fullwidth={true} />
        </div>
      </div>
    </div>
  );
}
