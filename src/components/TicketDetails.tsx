import { useNavigate } from "react-router-dom";
import { useTicketDetails } from "../store/checkout"


export default function TicketDetails() {

    const navigate = useNavigate()

  const {ticketDetails} = useTicketDetails()  
    
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-100">Ticket Breakdown</h1>
            <p className="text-gray-300">Detailed parking session information</p>
          </div>

          <div className="rounded-lg border border-gray-600/60 bg-gray-800/40 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Ticket ID</h3>
                <p className="text-lg font-mono text-gray-100">{ticketDetails.ticketId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Duration</h3>
                <p className="text-lg text-gray-100">{ticketDetails.durationHours} hours</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Check-in</h3>
                <p className="text-gray-100">{formatDateTime(ticketDetails.checkinAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Check-out</h3>
                <p className="text-gray-100">{formatDateTime(ticketDetails.checkoutAt)}</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">Total Amount</h3>
                <p className="text-2xl font-bold text-green-400">${ticketDetails.amount}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-600/60 bg-gray-800/40 p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Rate Breakdown</h3>
            <div className="space-y-4">
              {ticketDetails.breakdown.map((segment, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          segment.rateMode === "special"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {segment.rateMode.toUpperCase()}
                      </span>
                      <span className="text-gray-300">{segment.hours} hours</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-100">${segment.amount}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">From: </span>
                      <span className="text-gray-200">{formatDateTime(segment.from)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">To: </span>
                      <span className="text-gray-200">{formatDateTime(segment.to)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rate: </span>
                      <span className="text-gray-200">${segment.rate}/hour</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/checkout?step=ticket-id')} className="flex-1 bg-blue-800 cursor-pointer hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Back to Ticket Entry
            </button>
            <button onClick={() => window.print()} className="flex-1 bg-gray-700 cursor-pointer hover:bg-gray-600 text-gray-200 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Print the ticket
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
