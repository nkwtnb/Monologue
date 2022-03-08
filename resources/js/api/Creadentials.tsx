export interface Type {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  remember: true | undefined;
}

export const INITIAL_STATE: Type = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  remember: true,
}
