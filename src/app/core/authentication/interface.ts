export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

interface TokenEssentials {
  [prop: string]: any;
  access_token: string;
}
interface TokenOptionals {
  token_type: string;
  expires_in: number;
  exp: number;
  refresh_token: string;
}

export type Token = Required<TokenEssentials> & Partial<TokenOptionals>;
