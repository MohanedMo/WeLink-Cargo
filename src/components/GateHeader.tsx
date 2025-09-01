import { useState, useEffect } from "react";
import { status } from "../services/ws";
import { Terminal } from "lucide-react";
import { NavLink } from "react-router-dom";

interface GateHeaderProps {
  gateName?: string;
  gateLocation?: string;
}

export function GateHeader({ gateName, gateLocation }: GateHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate WebSocket connection status
  useEffect(() => {
    const connectionTimer = setInterval(() => {
      // Randomly toggle connection for demo purposes
    }, 5000);

    return () => clearInterval(connectionTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = () => {
    switch (status) {
      case "Connected":
        return "text-green-500";
      case "Connecting":
        return "text-yellow-500";
      case "Disconnected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Connected":
        return (
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        );
      case "Connecting":
        return (
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-spin border-2 border-yellow-200 border-t-yellow-500"></div>
        );
      case "Disconnected":
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200/40 bg-blue-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-blue-900/90">
      <div className="mx-auto flex h-22  max-w-7xl items-center justify-between px-6 lg:px-8">
        {gateName && (
          <div className="flex items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 border border-green-500/30 ring-1 ring-green-500/10">
                <Terminal className="h-5 w-5 text-green-400" />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-lg font-bold tracking-tight text-gray-100">
                  {gateName}
                </h1>
                <p className="font-mono text-sm text-gray-300">
                  {gateLocation}
                </p>
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <span className={`text-sm font-medium ${getStatusColor()}`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-5">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-extrabold text-white" : "text-white"
                }
                to={"/gates"}
              >
                Gates
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-extrabold text-white" : "text-white"
                }
                to="/checkout"
              >
                Checkout
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-extrabold text-white" : "text-white"
                }
                to="/admin"
              >
                Admin
              </NavLink>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="text-right space-y-0.5">
            <div className="font-mono text-base font-bold tracking-wider text-gray-100">
              {formatTime(currentTime)}
            </div>
            <div className="font-mono text-xs text-gray-300">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
