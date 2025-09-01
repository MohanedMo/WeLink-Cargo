import type React from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Calendar, X, Plus, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";

import { adminApis } from "../services/Apis/admin/admin.api";
import type { RushHour, Vacation } from "../services/Apis/admin/admin.types";
import { connectWS } from "../services/ws";

interface AddVacationModalProps {
  model: string;
  onClose: () => void;
}

export default function AddVacationModal({
    
  model,
  onClose,
}: AddVacationModalProps) {

      useEffect(() => {
        connectWS();
      }, []);

  const [hoursData, setHoursData] = useState<RushHour>({
    weekDay: "",
    from: "",
    to: "",
  });
  const [vacationData, setVacationData] = useState<Vacation>({
    name: "",
    from: "",
    to: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hoursMutate = useMutation({
    mutationFn: (hours: RushHour) => adminApis.addRushHour(hours),
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Rush Hour added successfully !",
        icon: "success",
        confirmButtonText: "Ok",
      });
    },
    onError: () => {
        Swal.fire({
        title: "Error",
        text: "Rush Hour not added !",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  });
  const vacationMutate = useMutation({
    mutationFn: (vacation: Vacation) => adminApis.addVacation(vacation),
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Vacation added successfully !",
        icon: "success",
        confirmButtonText: "Ok",
      });
    },
    onError: () => {
        Swal.fire({
        title: "Error",
        text: "Vacation not added !",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model === 'hour' ? !hoursData.weekDay.length || !hoursData.from.length || !hoursData.to.length : !vacationData.name.length ||
      !vacationData.from.length ||
      !vacationData.to.length) {
      return;
    }
    setIsSubmitting(true);
    try {
      if(model === 'hour') {
        hoursMutate.mutate(hoursData)
        setHoursData({
          weekDay: "",
          from: "",
          to: "",
        });
      }
      if(model === 'vacation') {
        vacationMutate.mutate(vacationData)
        setVacationData({
          name: "",
          from: "",
          to: "",
        });
      }
      onClose();
    } catch (error) {
      console.error("Failed to add vacation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (model.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-50 bg-gray-800 rounded-lg border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-300" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              {model === "hour" ? "Add Rush Hour" : "Add Vacation Period"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {model === "hour" ? "Week Day" : "Vacation Name"}{" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={model === "hour" ? hoursData.weekDay : vacationData.name}
              onChange={(e) =>
                model === "hour"
                  ? setHoursData({
                      ...hoursData,
                      weekDay: e.currentTarget.value,
                    })
                  : setVacationData({
                      ...vacationData,
                      name: e.currentTarget.value,
                    })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Summer Break"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                From <span className="text-red-400">*</span>
              </label>
              <input
                type={model === "hour" ? "time" : "date"}
                value={
                  model === "hour"
                    ? hoursData.from
                    : vacationData.from
                }
                onChange={(e) =>
                  model === "hour"
                    ? setHoursData({
                        ...hoursData,
                        from: e.currentTarget.value,
                      })
                    : setVacationData({
                        ...vacationData,
                        from: e.currentTarget.value,
                      })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To <span className="text-red-400">*</span>
              </label>
              <input
                type={model === "hour" ? "time" : "date"}
                value={
                  model === "hour" ? hoursData.to : vacationData.to
                }
                onChange={(e) =>
                  model === "hour"
                    ? setHoursData({
                        ...hoursData,
                        to: e.currentTarget.value,
                      })
                    : setVacationData({
                        ...vacationData,
                        to: e.currentTarget.value,
                      })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={
                  model === "hour"
                    ? hoursData.from
                    : vacationData.from
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                model === "hour"
                  ? isSubmitting ||
                    !hoursData.weekDay ||
                    !hoursData.from ||
                    !hoursData.to
                  : isSubmitting ||
                    !vacationData.name ||
                    !vacationData.from ||
                    !vacationData.to
              }
              className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>Add {model === "hour" ? "rush Hour" : "Vacation"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
