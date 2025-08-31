import { BrowserRouter, Routes, Route } from "react-router-dom"


import { useGateData} from "./store/gate";

import Gate from "./pages/gate";
import Checkout from "./pages/checkpoint";
import { GateHeader } from "./components/GateHeader";

import './App.css'
import Admin from "./pages/admin";

function App() {

  const { gateData } = useGateData();

  return (
    <BrowserRouter>
    <GateHeader gateName={gateData?.name} gateLocation={gateData?.location}/>
      <Routes>
        <Route path="/gates/:gateId" element={<Gate />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
