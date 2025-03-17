import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Exchange the code for tokens
      fetch("http://35.154.84.189:4001/auth/cognito/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("idToken", data.idToken);
            navigate("/"); // Redirect to home page after login
          }
        })
        .catch((error) => console.error("Token exchange failed:", error));
    }
  }, [navigate]);

  return <h2>Logging in...</h2>;
};

export default AuthCallback;
