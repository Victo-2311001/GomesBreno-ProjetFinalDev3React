import axios from "axios";
import { createContext, useState } from "react";

export type LoginContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  username: string,
  logout: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  login: () => new Promise<boolean>(() => false),
  username: ' ',
  logout: () => {},
});

export default function LoginProvider({ children }: { children: React.ReactNode }) {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("username") || '';
  });

  async function login(email: string, password: string): Promise<boolean> {
     return axios
      .post('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/utilisateur/connexion', {
        email,
        motDePasse: password,
      })
      .then((response) => {;
        if (response.data.success == true) {
          setIsLoggedIn(true);
          setUsername(email);
          console.log(isLoggedIn)

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", email);
          return true;
        } else {
          setIsLoggedIn(false);
          setUsername('');
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          return false;
        }
      })
    }

    function logout() {
        setUsername(' ');
        setIsLoggedIn(false);
    }

    const values = { isLoggedIn, username ,login, logout };

    return (
        <LoginContext.Provider value={values}>
        {children}
        </LoginContext.Provider>
    );
}

//Inspiré de https://web3.profinfo.ca/authentification/
//Aide de l'IA pour régler déconnexion involontaire