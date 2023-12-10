declare module "@livechat/accounts-sdk" {
  type Props = {
    client_id: string;
    server_url: string;
    redirect_uri?: string;
  };
  type Authorization = {
    authorize: () => Promise<AuthorizeData>;
  };
  type AuthorizeData = {
    access_token: string;
    scope: string;
  };

  export default class AccountsSDK {
    constructor(params: Props): AccountsSDK {}
    iframe(): Authorization;
    popup(): Authorization;
  }
}
