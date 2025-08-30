import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Users, UserCheck } from "lucide-react";

import { gateApis } from "../services/Apis/gate page/gate.api";
import { useUserType, useGateData, useZonesData, useTicketData } from "../store/gate-page";
import { connectWS } from "../services/ws";
import type { Gate } from "../services/Apis/gate page/gate.types";

import { GateHeader } from "../components/GateHeader";
import ZoneCard from "../components/ZoneCard";
import { TicketModel } from "../components/TicketModal";

const Gate = () => {
  const { gateId } = useParams();
  const { userType, changeUserType } = useUserType();
  const { gateData, setGateData } = useGateData();
  const { zonesData, setZones } = useZonesData();
  const { isModelOpen, ticketData, setModelStatus} = useTicketData();

  const { data: gates = [] } = useQuery({
    queryKey: ["gates"],
    queryFn: () => gateApis.getGates(),
  });

  const { data: zones, isLoading: isZonesLoading } = useQuery({
    queryKey: ["zones", gateId],
    queryFn: () => gateApis.getZonesByGate(gateId),
    enabled: !!gateId,
  });

  useEffect(() => {
    const newGate = gates?.find((g) => g.id === gateId);
    if (newGate && newGate.id !== gateData?.id) {
        setGateData(newGate);
        setZones(zones || []);
    }

    connectWS(gateId);
}, [gates, gateId]);


  return (
    <>
      <GateHeader gateName={gateData?.name} gateLocation={gateData?.location} />
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center rounded-lg bg-gray-800/40 border border-gray-600/60 p-1 w-fit mb-3">
          <button
            onClick={() => changeUserType("visitor")}
            className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              userType === "visitor"
                ? "bg-green-500/20 text-green-300 border border-green-500/30 shadow-sm"
                : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/40"
            }`}
          >
            <Users className="h-4 w-4" />
            Visitor
          </button>
          <button
            onClick={() => changeUserType("subscriber")}
            className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              userType === "subscriber"
                ? "bg-green-500/20 text-green-300 border border-green-500/30 shadow-sm"
                : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/40"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Subscriber
          </button>
        </div>
        <div className="space-y-8">
          <div className="rounded-lg border border-gray-600/60 bg-gray-800/40 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">
              Zone Management Dashboard
            </h2>
            <p className="text-gray-300">
              Select parking zones for {userType}s. Available zones are shown
              with real-time occupancy data, rates, and special pricing
              indicators. Closed zones and unavailable slots are automatically
              disabled.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-100">
                Available Zones for {userType}
              </h3>
              <div className="text-sm text-gray-400">
                Select a zone to proceed with booking
              </div>
            </div>
            {isZonesLoading ? (
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
                {zonesData?.map((zone) => (
                  <ZoneCard key={zone.id} zone={zone} />
                ))}
              </div>
            )}
          </div>
        </div>
        <TicketModel isOpen={isModelOpen} ticketData={ticketData} onClose={() => setModelStatus(false)}/>
      </main>
    </>
  );
};

export default Gate;
