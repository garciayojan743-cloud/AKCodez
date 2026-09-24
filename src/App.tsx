import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GoRedirect from "./pages/GoRedirect";
import Panel from "./pages/Panel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/go/:slug" element={<GoRedirect />} />
      <Route path="/panel" element={<Panel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
