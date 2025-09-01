import { useState, useEffect } from "react";
import {
  CheckCircle,
  Printer,
  MapPin,
  Clock,
  CreditCard,
  X,
} from "lucide-react";
import type { TicketModel } from "../services/Apis/gate page/gate.types";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: TicketModel;
}

export function TicketModel({
  isOpen,
  onClose,
  ticketData,
}: SuccessModalProps) {
  const [showGateAnimation, setShowGateAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowGateAnimation(true);
      }, 100);

      const completeTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 200);

      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    } else {
      setShowGateAnimation(false);
      setAnimationComplete(false);
    }
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 max-w-md w-full mx-4 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg">
        <div className="p-6">
          <div className="relative">
            <button
              className="absolute -top-2 -right-2 h-8 w-8 cursor-pointer rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="h-16 w-16 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-green-400 mb-1">
                Access Granted!
              </h2>
              <p className="text-sm text-gray-400">
                Your parking spot has been reserved
              </p>
            </div>

            <div className="mb-6">
              <div className="relative h-20 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-1 bg-gray-600">
                    <div
                      className={`absolute left-0 top-0 h-1 bg-red-500 transition-all duration-1000 ${
                        showGateAnimation ? "w-0" : "w-1/2"
                      }`}
                    />
                    <div
                      className={`absolute right-0 top-0 h-1 bg-red-500 transition-all duration-1000 ${
                        showGateAnimation ? "w-0" : "w-1/2"
                      }`}
                    />
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`h-3 w-3 rounded-full transition-all duration-500 ${
                          animationComplete ? "bg-green-500" : "bg-amber-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs border transition-all duration-500 ${
                      animationComplete
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : showGateAnimation
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-red-500/20 text-red-300 border-red-500/30"
                    }`}
                  >
                    {animationComplete
                      ? "OPEN"
                      : showGateAnimation
                      ? "OPENING..."
                      : "CLOSED"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-gray-700 bg-gray-800/60 rounded-lg print:bg-white print:text-black print:border-black">
              <div className="p-4">
                <div className="text-center mb-4 print:mb-6">
                  <h3 className="font-bold text-lg text-gray-100 print:text-black">
                    PARKING TICKET
                  </h3>
                  <p className="text-xs text-gray-400 print:text-gray-600">
                    Keep this ticket for your records
                  </p>
                </div>

                <div className="space-y-3 print:space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-700 print:border-gray-300">
                    <span className="text-sm text-gray-400 print:text-gray-600">
                      Ticket ID:
                    </span>
                    <span className="font-mono font-bold text-gray-100 print:text-black">
                      {ticketData.ticket.id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-700 print:border-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400 print:text-gray-600" />
                      <span className="text-sm text-gray-400 print:text-gray-600">
                        Check-in:
                      </span>
                    </div>
                    <span className="font-mono text-gray-100 print:text-black">
                      {ticketData.ticket.checkinAt}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-700 print:border-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 print:text-gray-600" />
                      <span className="text-sm text-gray-400 print:text-gray-600">
                        Zone:
                      </span>
                    </div>
                    <span className="font-bold text-gray-100 print:text-black">
                      {ticketData.zoneState.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-700 print:border-gray-300">
                    <span className="text-sm text-gray-400 print:text-gray-600">
                      Gate:
                    </span>
                    <span className="font-mono text-gray-100 print:text-black">
                      {ticketData.ticket.gateId.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400 print:text-gray-600" />
                      <span className="text-sm text-gray-400 print:text-gray-600">
                        Rate:
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-100 print:text-black">
                        ${ticketData.zoneState.rateSpecial}/hr
                      </span>
                      <span className="ml-2 inline-flex items-center rounded-md px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs print:bg-blue-100 print:text-blue-800 print:border-blue-300">
                        {ticketData.ticket.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="h-4 w-4" />
                Print Ticket
              </button>
              <button
                onClick={onClose}
                className="flex-1 border cursor-pointer border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
