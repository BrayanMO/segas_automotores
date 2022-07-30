import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { getToken, removeToken, setToken } from "src/Api/TokenApi";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const UserStateContext = createContext(undefined);

export function useUSer() {
  return useContext(UserStateContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token, idUser: jwtDecode(token)?.id, username: jwtDecode(token)?.usuario });
    } else {
      setUser(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    Cookies.set("token", token);
    setToken(token); //guardamos el token en el localStorage mediante la funcion setToken
    setUser({ token, idUser: jwtDecode(token)?.id, username: jwtDecode(token)?.usuario }); //guardamos el token y el id del usuario en el state
  };

  const logout = () => {
    if (user) {
      Cookies.remove("token");
      removeToken();
      setUser(null);
      router.push("/");
    }
  };

  const userData = useMemo(
    () => ({
      user,
      login,
      logout,
      setReloadUser,
    }),
    [user]
  );

  if (user === undefined) return null;

  return <UserStateContext.Provider value={userData}>{children}</UserStateContext.Provider>;
}

export { UserProvider };
