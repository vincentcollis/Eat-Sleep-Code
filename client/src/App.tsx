import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginContainer from "./features/login/LoginContainer";
import HeaderContainer from "./features/header/HeaderContainer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderContainer />
        <Routes>
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
