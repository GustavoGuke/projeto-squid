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
    Stack,
    Radio,
    RadioGroup,

} from "@chakra-ui/react"

import { useState } from "react"
import api from "../services/api"

const ModalComp = ({ dataEdit, isOpen, onClose }) => {
    const [user, setUser] = useState(dataEdit.user || "")
    const [senha, setSenha] = useState(dataEdit.password || "")
    const [ativo, setAtivo] = useState(dataEdit.enabled || 1)
    const [nome, setName] = useState(dataEdit.fullname || "")
    const [dpto, setDpto] = useState(dataEdit.comment || "")
    const [direito, setDireito] = useState(dataEdit.direito || 1)

    const data = {
        user: user,
        password: senha,
        enabled: ativo,
        fullname: nome,
        comment: dpto,
        direito: direito
    }

    const apagarInputs = () => {
        setUser('')
        setSenha('')
        setName('')
        setDpto('')

    }

    const handleSalvar = () => {
        if (!user && !senha) return

        if (Object.keys(dataEdit).length) {
            api.put(`${user}`, data)
            alert("Funcionario alterado")
            apagarInputs()
        }
        if (!Object.keys(dataEdit).length) {
            api.post(``, data)
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
                                <FormLabel>STATUS</FormLabel>
                                <RadioGroup defaultValue='1'>
                                    <Stack spacing={4} direction='row'>
                                        <Radio value='1' onChange={(e) => setAtivo(Number(e.target.value))}>ATIVO</Radio>
                                        <Radio value='0' onChange={(e) => setAtivo(Number(e.target.value))}>INATIVO</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Box>
                            <Box>
                                <FormLabel>ADMINISTRADOR</FormLabel>
                                <RadioGroup defaultValue='1'>
                                    <Stack spacing={4} direction='row'>
                                        <Radio value='1' onChange={(e) => setDireito(Number(e.target.value))}>SIM</Radio>
                                        <Radio value='0' onChange={(e) => setDireito(Number(e.target.value))}>NÃO</Radio>
                                    </Stack>
                                </RadioGroup>
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