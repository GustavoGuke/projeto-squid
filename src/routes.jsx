
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { UsuarioLogado, UsuarioLogadoProvider } from './context/UserContext';
import { useContext } from 'react';


const AppRoutes = () => {
    const User = useContext(UsuarioLogado)
    return (
        <BrowserRouter>
            <UsuarioLogadoProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/Home' element={<Home />} />
                </Routes>
            </UsuarioLogadoProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;