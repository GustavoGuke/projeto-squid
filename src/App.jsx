import { EditIcon, DeleteIcon, CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import api from "./services/api"


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
      api
      .get("/")
      .then((response) => setData(response.data))
  })
 
  const handleRemove = (user) => {
    console.log(user)
    const certeza = confirm("confirmar exclusão?")
    if(certeza){
      api.delete(`/${user}`)  
    }
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="16px"
      fontFamily="poppins"
    >
      <Box maxW={1024} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>


        <Box overflowY="auto" height="100%" >
          <Table mt="6">
            <Thead backgroundColor='gray.200' >
              <Tr >
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  login
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  Senha
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  Ativo
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  nome
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  dpto
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ user, password, enabled, fullname, comment }, index) => (
                
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 50 : 170}>{user}</Td>
                  <Td maxW={isMobile ? 50 : 140}>{password}</Td>
                  <Td maxW={isMobile ? 50 : 50}>
                    {enabled ? <CheckIcon color='green'/> : <NotAllowedIcon color='red'/>}
                  </Td>
                  <Td maxW={isMobile ? 50 : 150}>{fullname}</Td>
                  <Td maxW={isMobile ? 50 : 120}>{comment}</Td>

                  <Td p={2}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ user, password, enabled, fullname, comment }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={2}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(user)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}



    </Flex>

  )
}

export default App
