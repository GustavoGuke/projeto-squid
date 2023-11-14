import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { useState } from "react";

const Login = () => {
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [data, setData] = useState([])
    const navegar = useNavigate()
    
    useEffect(() => {
        api
          .get("/")
          .then((response) => setData(response.data))
      }, [data])

   
    const aoColocarDados = () => {
        if(!login || !senha) return
        const user = login.toUpperCase().trim()
       console.log(user)
        console.log(senha)
        const loginAuth = data.find((usuario) => {
            return usuario.user === user
        })
        if(loginAuth === undefined ) return
        if(loginAuth.password !== senha.toLowerCase()) return
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
                        value={login} 
                        onChange={(e) => setLogin(e.target.value)}/>

                        <FormLabel mt='40px' fontWeight='bold'>SENHA:</FormLabel>
                        <Input 
                        required 
                        type='password'
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)}/>

                     
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
