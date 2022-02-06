import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";

const WelcomeUser = () => {
  const { accounts } = useMsal();
  const username = accounts[0].username;

  return <p>Welcome, {username}</p>;
};

// Remember that MsalProvider must be rendered somewhere higher up in the component tree
const MsalLogin: React.VFC = () => {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      <p>This will only render if a user is signed-in.</p>
      <WelcomeUser />
    </MsalAuthenticationTemplate>
  );
};

export default MsalLogin;
