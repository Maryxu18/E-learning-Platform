import * as React from "react";

export function LoginAuth({ email, password, setToken, setLoggedInUser }) {
  fetch("http://localhost:3000/login", {
    method: "POST",
    //mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Origin: "http://localhost:19006",
    },
    body: "email=" + email + "&password=" + password,
    credentials: "include",
  }).then((response) => {
    if (response.status === 200) {
      setToken("true");
      setLoggedInUser("logged in");
    } else {
      alert("incorrect credentials, please try again");
    }
  });
}
export const LoggedInUserContext = React.createContext<string | null>(null);
