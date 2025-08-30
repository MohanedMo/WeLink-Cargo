import { BrowserRouter, Routes, Route } from "react-router-dom"

import Gate from "./pages/gate";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gate/:gateId" element={<Gate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
