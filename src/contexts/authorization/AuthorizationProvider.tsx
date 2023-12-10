import { createContext, FC, ReactNode, useContext, useState } from "react";

import AccountsSDK from "@livechat/accounts-sdk";
import { LiveChatColored } from "@livechat/design-system-icons";
import { Button, Icon, Loader } from "@livechat/design-system-react-components";

import config from "../../../config";
import { useEffectOnce } from "../../hooks/use-effect-once";

if (!import.meta.env.VITE_CLIENT_ID) {
  throw new Error("Missing VITE_CLIENT_ID in env variables");
}

const accountsSDK = new AccountsSDK({
  client_id: import.meta.env.VITE_CLIENT_ID,
  server_url: config.authorizationServerUrl,
});

type Authorization = {
  scopes: string[];
  token: string;
};

const AuthorizationContext = createContext<Authorization>({} as Authorization);

type Props = {
  children: ReactNode;
};

export const AuthorizationProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<Authorization | null>(null);

  const handleAuth = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { access_token, scope } = await accountsSDK.iframe().authorize();

      setUserDetails({
        token: access_token,
        scopes: scope.split(","),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectOnce(() => {
    if (!userDetails?.token) {
      void handleAuth();
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!userDetails) {
    return (
      <Button
        kind="secondary"
        icon={<Icon source={LiveChatColored} />}
        onClick={() => void handleAuth()}
      >
        Login with livechat
      </Button>
    );
  }

  return (
    <AuthorizationContext.Provider value={userDetails}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = (): Authorization => {
  const context = useContext(AuthorizationContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
