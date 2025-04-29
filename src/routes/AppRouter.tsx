import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
