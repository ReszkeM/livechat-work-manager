import labs from "./labs.json";
import production from "./production.json";

type Env = "labs" | "production";

type ConfigJSON = {
  authorization_server_url: string;
  redirect_url: string;
};

type Config = {
  env: Env;
  authorizationServerUrl: string;
  redirectUrl: string;
};

if (!import.meta.env.VITE_NODE_ENV) {
  throw new Error("Missing VITE_NODE_ENV in env variables");
}

const parseConfig = (config: ConfigJSON): Config => {
  return {
    env: import.meta.env.VITE_NODE_ENV,
    authorizationServerUrl: config.authorization_server_url,
    redirectUrl: config.redirect_url,
  };
};

export default parseConfig(
  import.meta.env.VITE_NODE_ENV === "production"
    ? (production as ConfigJSON)
    : (labs as ConfigJSON)
);
