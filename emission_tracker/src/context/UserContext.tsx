import React, { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  firstName: string;
  setName: (firstName: string) => void;
  userType: string;
  setUserType: (userType: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const userTypes = ["Customer", "Driver", "Manager", "Admin"];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firstName, setName] = React.useState<string>('Tim'); // Placeholder, update to dynamically grab from db
  const [userType, setUserType] = React.useState<string>(userTypes[2]);

  return (
    <UserContext.Provider value={{ firstName, setName, userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
