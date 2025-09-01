import { useSearchParams } from "react-router-dom";

import LoginForm from "../components/Login";
import TicketDetails from "../components/TicketDetails";
import TicketId from "../components/TicketId";
import { useUserName } from "../store/checkout";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

  const { role } = useUserName();

  if (role !== "employee") {
    return <LoginForm />;
  }

  return (
    <>
      {step !== "ticket-details" && <TicketId />}
      {step === "ticket-details" && <TicketDetails />}
    </>
  );
};

export default Checkout;
