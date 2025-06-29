export interface Information {
  email?: string;
  id?: { name?: string; value?: string };
  name?: {
    title?: string;
    first?: string;
    last?: string;
  };
  phone?: string;
}

export interface LocalUserData {
  id: string;
  name: string;
  email: string;
}
