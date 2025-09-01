import { Building2, MapPin, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { gateApis } from "../services/Apis/gate page/gate.api";

export default function GatesPage() {
  const { data: gates = [], isLoading } = useQuery({
    queryKey: ["gates"],
    queryFn: () => gateApis.getGates(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl px-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Gate Management</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gates.map((gate) => (
            <a
              key={gate.id}
              href={`/gates/${gate.id}`}
              className="bg-gray-800/40 border border-gray-600/60 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {gate.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-mono">{gate.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{gate.location}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {gate.zoneIds.length} Zone
                  {gate.zoneIds.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {gate.zoneIds.map((zoneId) => (
                  <span
                    key={zoneId}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded font-mono border border-gray-600/30"
                  >
                    {zoneId}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-blue-400 text-xs">Click to manage gate</p>
              </div>
            </a>
          ))}
        </div>

        {gates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No gates found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
