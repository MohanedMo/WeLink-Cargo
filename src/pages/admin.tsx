import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CarFront, Box, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useUserName } from "../store/checkout";
import { adminApis } from "../services/Apis/admin/admin.api";
import type { Zone } from "../services/Apis/gate page/gate.types";
import { useAdminZones } from "../store/admin";

import LoginForm from "../components/Login";
import Categories from "../components/Categories";
import Log from "../components/Log";
import ZoneCard from "../components/ZoneCard";

const Admin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");
  const [screen, setScreen] = useState("categories");
  const { role } = useUserName();
  const {zonesAdminData, setZonesData} = useAdminZones()
  
  const {data: zones, isLoading} = useQuery({
    queryKey: ['zones'],
    queryFn: () => adminApis.getZones()
  })


  useEffect(() => {
    if (role !== "admin") {
      navigate("/admin?step=login");
    }
    setZonesData(zones)
  }, [zones]);

  return (
    <>
      {step === "login" && <LoginForm />}
      <main className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between w-full rounded-lg bg-gray-800/40 border border-gray-600/60 p-1 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setScreen("zones")}
              className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                screen === "zones"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30 shadow-sm"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/40"
              }`}
            >
              <CarFront className="h-4 w-4" />
              Zones
            </button>
            <button
              onClick={() => setScreen("categories")}
              className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                screen === "categories"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30 shadow-sm"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/40"
              }`}
            >
              <Box className="h-4 w-4" />
              Categories
            </button>
            <button
              onClick={() => setScreen("log")}
              className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                screen === "log"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30 shadow-sm"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/40"
              }`}
            >
              <Box className="h-4 w-4" />
              Log
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
              <span>Add Rush Hour</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
              <span>Add Vacation</span>
            </button>
          </div>
        </div>
      {screen === "zones" && (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-100">
                Available Zones
              </h3>
            </div>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    data-slot="card"
                    className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm animate-pulse border-gray-600/60 bg-gray-800/40"
                  >
                    <div data-slot="card-content" className="p-6">
                      <div className="h-4 bg-gray-700 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-700 rounded4"></div>
                        <div className="h-3 bg-gray-700 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-700 rounded4"></div>
                        <div className="h-3 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {zonesAdminData?.map((zone: Zone) => (
                  <ZoneCard key={zone.id} zone={zone} type= 'admin'/>
                ))}
              </div>
            )}
          </div>
      )}
      </main>
      {screen === "categories" && <Categories />}
      {screen === "log" && <Log />}
    </>
  );
};

export default Admin;
