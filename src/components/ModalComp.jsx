import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,

} from "@chakra-ui/react"

import { useState } from "react"
import api from "../services/api"

const ModalComp = ({dataEdit,  isOpen, onClose }) => {
    const [user, setUser] = useState(dataEdit.user || "")
    const [senha, setSenha] = useState(dataEdit.password || "")
    const [ativo, setAtivo] = useState(dataEdit.enabled || 1)
    const [nome, setName] = useState(dataEdit.fullname || "")
    const [dpto, setDpto] = useState(dataEdit.comment || "")

    const data = {
        user:user,
        password: senha,
        enabled:ativo,
        fullname: nome,
        comment: dpto
    }

    const apagarInputs = () => {
        setUser('')
        setSenha('')
        setAtivo('')
        setName('')
        setDpto('')
    }
   
    const handleSalvar = () => {
        if (!user && !senha) return
       
        if (Object.keys(dataEdit).length) {
            api.put(`${user}`, data)
            apagarInputs()
            alert("Funcionario alterado")
        }
        if (!Object.keys(dataEdit).length) {
            api.post(``,data)
            alert("Funcionario incluido")
            apagarInputs()  
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Cadastrar</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody >
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>LOGIN</FormLabel>
                                <Input
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>SENHA</FormLabel>
                                <Input
                                    type="text"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>ATIVO</FormLabel>
                                <Input
                                    type="text"
                                    value={ativo}
                                    onChange={(e) => setAtivo(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>NOME</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>DPTO</FormLabel>
                                <Input
                                    type="text"
                                    value={dpto}
                                    onChange={(e) => setDpto(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='green' onClick={handleSalvar}>Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComp;