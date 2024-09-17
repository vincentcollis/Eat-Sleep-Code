import { createContext } from "react";
import type { User } from "firebase/auth";

const EatSleepCodeContext = createContext<
  [User | null, React.Dispatch<React.SetStateAction<User | null>>]
>([null, () => {}]);

export default EatSleepCodeContext;
