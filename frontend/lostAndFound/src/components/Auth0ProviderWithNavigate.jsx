import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = "dev-cym0k0n1zqmk6vjd.us.auth0.com";
  const clientId = "DkZ01dHWUlNTJ24HjsVjeeCRBJz1bKnN";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/");  // 👈 default to Home page
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
