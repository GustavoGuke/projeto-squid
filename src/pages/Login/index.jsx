import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { useState, useContext } from "react";

import { UsuarioLogado } from "../../context/UserContext";
const Login = () => {
    const User = useContext(UsuarioLogado)
    const [usuarioStorage, setUsuarioStorage] = useState('')
    const [data, setData] = useState([])
    const navegar = useNavigate()
    
    useEffect(() => {
        const carregarUsuarios = localStorage.getItem("usuarioStorage")
        if (carregarUsuarios) {
            setUsuarioStorage(JSON.parse(carregarUsuarios))
        }
    }, [])


    useEffect(() => {
        api
          .get("/")
          .then((response) => setData(response.data))
      })

    const aoColocarDados = () => {
        if(!User.login || !User.senha) return
        const user = User.login.toUpperCase().trim()
       
        const loginAuth = data.find((usuario) => {
            return usuario.user === user
        })
        if(loginAuth === undefined ) return
        if(loginAuth.password !== User.senha.toLowerCase()) return

        const usuarioStorage = {
            login: User.login,
            senha: User.senha
        }
        localStorage.setItem("usuarioStorage", JSON.stringify(usuarioStorage))
        if(loginAuth.direito == 1){    
            navegar('/Home')
        }
    }
    return (

        <>
            <Flex
                h="100vh"
                align="center"
                justify="center"
                fontSize="16px"
                fontFamily="Arial"

            >
                <Box maxW={1024} h="100vh" py={10} px={2} >
                    <FormControl pt={50}>
                        <FormLabel mt='40px' fontWeight='bold'>LOGIN:</FormLabel>
                        <Input 
                        required 
                        type='text'
                        value={User.login} 
                        onChange={(e) => User.setLogin(e.target.value)}/>

                        <FormLabel mt='40px' fontWeight='bold'>SENHA:</FormLabel>
                        <Input 
                        required 
                        type='password'
                        value={User.senha} 
                        onChange={(e) => User.setSenha(e.target.value)}/>

                     
                    </FormControl>
                    <Button
                            mt='5'
                            w='100%'
                            colorScheme='green'
                            size='lg'
                            onClick={aoColocarDados}
                        >
                            ENTRAR
                        </Button>
                </Box>
            </Flex>

        </>

    );
}

export default Login;
