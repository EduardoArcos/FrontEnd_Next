export interface JwResponseI {
  id: number;
  username: string;
  email: string;
  roles: [];
  tokenType: string;
  accessToken: string;
}
