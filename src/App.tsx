import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useGateData } from "./store/gate";

import GatesPage from "./pages/gates";
import Gate from "./pages/gate";
import Checkout from "./pages/checkpoint";
import Admin from "./pages/admin";

import { GateHeader } from "./components/GateHeader";

function App() {
  const { gateData } = useGateData();

  return (
    <BrowserRouter>
      <GateHeader gateName={gateData?.name} gateLocation={gateData?.location} />
      <Routes>
        <Route path="/" element={<GatesPage />} />
        <Route path="/gates/:gateId" element={<Gate />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
