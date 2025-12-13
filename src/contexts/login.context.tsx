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

export default function LoginProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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
          return true;
        } else {
          setIsLoggedIn(false);
          setUsername('');
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
        {props.children}
        </LoginContext.Provider>
    );
}

//Inspiré de https://web3.profinfo.ca/authentification/