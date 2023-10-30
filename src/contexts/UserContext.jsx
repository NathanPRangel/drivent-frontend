import { createContext } from 'react';
import { useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [atividades, setAtividades] = useState("");

  
  return (
    <UserContext.Provider value={{ userData, setUserData, nome, setNome, cpf, setCPF, modalidade, setModalidade, atividades, setAtividades}}>
      {children}
    </UserContext.Provider>
  );
}
