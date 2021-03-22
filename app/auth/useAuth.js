import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default function useAuth() {
  // export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = authToken;
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
}
// export default useAuth;
