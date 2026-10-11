import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Default from "./pages/Default";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/default" element={<Default />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;