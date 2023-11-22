import { createContext, useState } from "react";

export const UsuarioLogado = createContext()
UsuarioLogado.displayName = "User"


export const UsuarioLogadoProvider = ({children}) => {
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    return (
        <UsuarioLogado.Provider
        value={{login, setLogin, senha, setSenha}}
        >
            {children}
        </UsuarioLogado.Provider>
    )
}