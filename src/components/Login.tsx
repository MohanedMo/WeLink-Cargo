import type React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";


import { checkoutApis } from "../services/Apis/checkout/checkout.api";
import { useUserName } from "../store/checkout";

export default function LoginForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { username, setUserName } = useUserName();

  const mutation = useMutation({
    mutationFn: () => checkoutApis.login({ username: usernameInput, password }),
    onSuccess: (loginRes) => {
      setIsLoading(false);
      Swal.fire({
        title: "Success",
        text: "login successfully !",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setUserName(loginRes.user.username, loginRes.user.role, loginRes.token);
      if(loginRes.user.role === 'admin'){
        navigate('/admin')
      }else{
        navigate('/checkout?step=ticket-id')
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!usernameInput.trim() || !password.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      if (username === usernameInput) {
        Swal.fire({
          title: "Attention!",
          text: "You are already signed in",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        navigate('/checkout?step=ticket-id')
        return;
      }
      mutation.mutate();
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-600/60 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Gate Access Login
            </h1>
            <p className="text-gray-400">
              Enter your credentials to access the system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={usernameInput}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-colors"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-600/50 rounded-md p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-800 cursor-pointer hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
