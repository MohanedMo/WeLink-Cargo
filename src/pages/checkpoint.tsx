import { useEffect } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import LoginForm from "../components/Login";
import TicketDetails from "../components/TicketDetails";
import TicketId from "../components/TicketId";

const Checkout = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

useEffect(() => {
    navigate("/checkout?step=login");
}, [])

  return (
    <>
      {step === "login" && <LoginForm />}
      {step === "ticket-id" && <TicketId />}
      {step === "ticket-details" && <TicketDetails />}
    </>
  );
};

export default Checkout;
