import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/level/:id" element={<Home/>} />
      </Routes>
    </Router>
  );
}
