import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import LoginContainer from "./features/login/LoginContainer";
import HeaderContainer from "./features/header/HeaderContainer";
import EatSleepCodeContext from "./utils/eatSleepCodeContext";
import { auth } from "./utils/firebase";
import { SlashIcon } from "@heroicons/react/24/outline";
import BoardContainer from "./features/board/BoardContainer";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Error signing in anonymously:", error);
        });
      }
      console.log(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <EatSleepCodeContext.Provider value={[user, setUser]}>
          <HeaderContainer />
          <Routes>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/board" element={<BoardContainer />} />
          </Routes>
        </EatSleepCodeContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
