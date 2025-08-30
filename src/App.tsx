import { BrowserRouter, Routes, Route } from "react-router-dom"

import Gate from "./pages/gate";
import Checkout from "./pages/checkpoint";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gate/:gateId" element={<Gate />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
