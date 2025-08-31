import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Zone } from "../services/Apis/gate page/gate.types";
import { gateApis } from "../services/Apis/gate page/gate.api";
import { useUserType, useGateData, useTicketData } from "../store/gate";
import Swal from "sweetalert2";

type ZoneCardProps = {
  zone: Zone;
};

const ZoneCard = ({ zone }: ZoneCardProps) => {
  const { userType } = useUserType();
  const { gateData } = useGateData();
  const { setModelStatus, setTicketData } = useTicketData();
  const [subscriberId, setSubscriberId] = useState("");

  const bookTicketBodyForVisitor = {
    gateId: gateData.id,
    zoneId: zone.id,
    type: userType,
  };
  const bookTicketBodyForSubscriber = {
    subscriptionId: subscriberId,
    gateId: gateData.id,
    zoneId: zone.id,
    type: userType,
  };
  const bodyByType =
    userType === "visitor"
      ? bookTicketBodyForVisitor
      : bookTicketBodyForSubscriber;

  const mutation = useMutation({
    mutationFn: () => gateApis.bookTicket(bodyByType),
    onSuccess: (bookedZone) => {
      setModelStatus(true);
      setTicketData(bookedZone);
      console.log(bookedZone);
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Something Wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["subscriber-id", subscriberId],
    queryFn: () => gateApis.subscriptionIdValidation(subscriberId),
    enabled: false,
  });

  useEffect(() => {
    if(subscriberId.length !== 0){
      refetch()
    }
  },[subscriberId])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (subscriberId.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Please write the subscription id",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    refetch();    

    if (data && data?.active && data?.category === zone.categoryId) {
      mutation.mutate();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please write valid subscriber id !",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
  }

  return (
    <div
      data-slot="card"
      className={`text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm transition-all duration-200 border border-gray-600/60 bg-gray-800/40  hover:bg-gray-800/60 ${
        zone.open && zone.availableForVisitors > 0
          ? "hover:border-green-500/40"
          : "cursor-not-allowed opacity-50"
      }`}
    >
      <div data-slot="card-content" className="px-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 border border-green-500/30 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin h-5 w-5 text-green-400"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-100">{zone.name}</h3>
                <span
                  data-slot="badge"
                  className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-primary/90 text-xs font-medium bg-blue-500/20 text-blue-300 border-blue-500/30"
                >
                  {zone.categoryId}
                </span>
              </div>
            </div>
            <div>
              {zone.open ? (
                <span className="py-2 px-3 bg-green-500/20 text-green-300 border border-green-500/30 text-xs rounded-lg">
                  OPEN
                </span>
              ) : (
                <span className="py-2 px-3 bg-red-500/20 text-red-300 border border-red-500/30 text-xs rounded-lg">
                  CLOSED
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users h-3.5 w-3.5 text-gray-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-xs font-medium text-gray-400">
                Occupied
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-gray-100">
              {zone.occupied}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-check h-3.5 w-3.5 text-green-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <polyline points="16 11 18 13 22 9"></polyline>
              </svg>
              <span className="text-xs font-medium text-gray-400">
                Available
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-green-400">
              {userType === "visitor"
                ? zone.availableForVisitors
                : zone.availableForSubscribers}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="text-center">
            <p className="text-gray-400">Free</p>
            <p className="font-mono font-medium text-gray-200">{zone.free}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Reserved</p>
            <p className="font-mono font-medium text-gray-200">
              {zone.reserved}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Total</p>
            <p className="font-mono font-medium text-gray-200">
              {zone.totalSlots}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/40">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-gray-100">
              ${zone.rateSpecial}
            </span>
            <span
              data-slot="badge"
              className="justify-center rounded-md px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-primary/90 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-triangle-alert h-3 w-3"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              SPECIAL
            </span>
          </div>
          <span className="text-xs text-gray-400 line-through">
            ${zone.rateNormal}
          </span>
        </div>
        {userType === "visitor" ? (
          <button
            onClick={() => mutation.mutate()}
            className="px-4 py-2 bg-blue-900/95 rounded-xl mt-5 cursor-pointer text-white"
          >
            Book A Ticket
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="flex my-3 gap-3">
            <input
              onChange={(e) => setSubscriberId(e.currentTarget.value)}
              type="text"
              id="subscription-id"
              placeholder="Subscription ID"
              className="text-white p-2 border-2 border-blue-900/95 rounded-lg"
            />
            <input
              className="px-4 py-1 bg-blue-900/95 rounded-xl cursor-pointer text-white"
              type="submit"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ZoneCard;
