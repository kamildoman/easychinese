import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {parseCookies} from "nookies";
import {User} from "@/models/user";

interface AppContextModel {
  user: User | null;
}

const initialState: AppContextModel = {
  user: null,
};

export const AppContext = createContext(initialState);

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const token = parseCookies().jwt;
      if (!token) {
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
      <AppContext.Provider value={{ user }}>
      <Component {...pageProps} />
      </AppContext.Provider>
  );
}
