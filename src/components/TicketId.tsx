import type React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { checkoutApis } from "../services/Apis/checkout/checkout.api";
import { useTicketDetails } from "../store/checkout";

export default function TicketId() {
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setTicketDetails } = useTicketDetails();

  const mutation = useMutation({
    mutationFn: () => checkoutApis.ticketDetails(ticketId),
    onSuccess: (ticketDetails) => {
      if (ticketDetails.status !== "error") {
        Swal.fire({
          title: "Success",
          text: "ticket checked out !",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setTicketDetails(ticketDetails);
        navigate("/checkout?step=ticket-details");
      } else {
        Swal.fire({
          icon: "error",
          title: "Checkout failed",
          text: ticketDetails.message,
        });
      }
    },
  });

  const handleNext = async () => {
    if (!ticketId.trim()) {
      return;
    }
    setIsLoading(true);
    mutation.mutate();
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-900">
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-100">
              Enter Ticket ID
            </h1>
            <p className="text-gray-300">
              Please enter your ticket ID to proceed with gate access
            </p>
          </div>

          <div className="rounded-lg border border-gray-600/60 bg-gray-800/40 p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="ticketId"
                  className="block text-sm font-medium text-gray-200"
                >
                  Ticket ID
                </label>
                <input
                  id="ticketId"
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your ticket ID"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleNext}
                disabled={!ticketId.trim() || isLoading}
                className="w-full bg-blue-800 cursor-pointer hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Check Out"
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Need help? Contact gate support for assistance
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
