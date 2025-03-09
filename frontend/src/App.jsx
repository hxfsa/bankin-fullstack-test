import { Routes, Route } from "react-router-dom";
import Accounts from "../pages/Accounts";


export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Accounts />} />
      </Routes>
    </main>
  );
}
