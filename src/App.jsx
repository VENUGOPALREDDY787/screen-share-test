import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import ScreenTest from "./pages/ScreenTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen-test" element={<ScreenTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;