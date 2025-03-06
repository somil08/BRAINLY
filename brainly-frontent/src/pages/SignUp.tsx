import { useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
   

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      navigate("/signin");
      alert("You have signed up successfully!");

    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Signup"
            fullwidth={true}
          />
        </div>
      </div>
    </div>
  );
}
