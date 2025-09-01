import { useLogData } from "../store/admin";

const Log = () => {
  const { logData } = useLogData();

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  #Admin_ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {logData?.map((log, index) => (
                <tr key={index} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">
                      {log.adminId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <span className="text-sm  font-mono text-green-400">
                      {formatDateTime(log.timestamp) === 'Invalid Date' ? '' : formatDateTime(log.timestamp)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Log;
