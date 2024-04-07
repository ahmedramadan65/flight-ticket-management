import { Dispatch, SetStateAction, createContext, useState } from 'react';

export const AuthContext = createContext<{
  user?: {
    username?: string;
  };
  setUser: Dispatch<
    SetStateAction<
      | {
          username: string;
        }
      | undefined
    >
  >;
}>({
  user: undefined,
  setUser: () => null,
});
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    username: string;
  }>();

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
