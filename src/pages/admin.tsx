import { useEffect } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import LoginForm from "../components/Login";


const Admin = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

useEffect(() => {
    navigate("/admin?step=login");
}, [])

    return ( 
        <>
        {step === "login" && <LoginForm />}
        
        </>
     );
}
 
export default Admin;