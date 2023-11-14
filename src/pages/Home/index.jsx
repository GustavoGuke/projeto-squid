import { EditIcon, DeleteIcon, CheckIcon, NotAllowedIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  Select,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import ModalComp from "../../components/ModalComp";
import api from "../../services/api"


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [dadosNaoDuplicado, setDadosNaoDuplicado] = useState([])
  const [avancarDez, setAvancarDez] = useState(1)
  const [diminuirDez, setDiminuirDez] = useState(0)
 
  let naoDuplicado = []

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    api
      .get("/")
      .then((response) => setData(response.data))
  })


  api
    .get("/")
    .then((res) => setDadosNaoDuplicado(res.data))

  let duplicado = new Set(dadosNaoDuplicado.map((dpto => dpto.comment)))
  for (let i of duplicado) {
    naoDuplicado.push(i)
  }


  const handleRemove = (user) => {
    const certeza = confirm("confirmar exclusão?")
    if (certeza) {
      api.delete(`/${user}`)
    }
  };

  const handleVisivel = (index) => {

    const estaInvisivel1 = document.querySelector(`.estaInvisivel${index}`)
    let estaInvisivel = estaInvisivel1.children[1].style

    if (estaInvisivel.visibility == "hidden") {
      estaInvisivel.visibility = "visible"
    }
    else if (estaInvisivel.visibility == "visible") {
      estaInvisivel.visibility = "hidden"
    }
    else {
      console.log("sei la")
    }
  }

  const aoselecionarDpto = (evento) => {
    console.log(evento.target.value)
    const filtro = dadosNaoDuplicado.filter(dpto => dpto.comment === evento.target.value)
    console.log()
    setData(filtro)
  }

  const aoSelecionarTodos = () => {
    api
      .get("/")
      .then((response) => setData(response.data))
  }

  const aoAvancarDez = (tamanho) => {

    setDiminuirDez(avancarDez)
    setAvancarDez(avancarDez + 10)

    if (avancarDez == tamanho) {
      setAvancarDez(0)
    }

    console.log(avancarDez)
    console.log(diminuirDez)
    console.log(tamanho)
  }

  const aoDiminuirDez = () => {

  }

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

        <Box py={5} >
          <Box display='flex' alignItems='center' justifyContent='space-between' pb={2}>
            <label htmlFor="">BUSCAR POR DEPARTAMENTO:</label>
            <Button px={10} mt={2} colorScheme="blue" onClick={aoSelecionarTodos}>Trazer todos dpto</Button>
          </Box>
          <Select name="" id="" onChange={aoselecionarDpto}>
            {naoDuplicado.map((dpto) => (
              <option key={dpto} value={dpto} >{dpto}</option>
            ))}
          </Select>

        </Box>


        <Box overflowY="auto" height="100%" >
          <Table mt="6">
            <Thead backgroundColor='gray.200' >
              <Tr >
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  LOGIN
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  SENHA
                </Th>
                <Th p={0}></Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  STATUS
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  NOME
                </Th>
                <Th maxW={isMobile ? 50 : 100} fontSize="20px">
                  DPTO
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ user, password, enabled, fullname, comment, direito }, index) => (

                <Tr
                  key={index}
                  cursor="pointer "
                  _hover={{ bg: "gray.100" }}
                  className={`estaInvisivel${index}`}
                >
                  <Td maxW={isMobile ? 50 : 170}>{user}</Td>
                  <Td maxW={isMobile ? 50 : 140}
                    style={{ visibility: "hidden" }}
                  >
                    {password}
                  </Td>
                  <Td>
                    <ViewIcon onClick={() => handleVisivel(index)} />
                  </Td>
                  <Td maxW={isMobile ? 50 : 50}>
                    {enabled ? <CheckIcon color='green' /> : <NotAllowedIcon color='red' />}
                  </Td>
                  <Td maxW={isMobile ? 50 : 150}>{fullname}</Td>
                  <Td maxW={isMobile ? 50 : 120}>{comment}</Td>

                  <Td p={2}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ user, password, enabled, fullname, comment, direito }),
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
          {/* <Box maxW={isMobile ? 100 : 100} display="flex" py={30}>
            <Button width={20} size="lg" px={20}>-10</Button>
            <Button width={20} size="lg" px={20} onClick={() => aoAvancarDez(data.length)}>+10</Button>
          </Box> */}
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
