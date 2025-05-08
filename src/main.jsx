import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router'
import TelaLogin from './telas/Login.jsx'
import TelaCadastro from './telas/Cadastro.jsx'
import rotas from './rotas/rotas-modo-declarativo.jsx';

// const router = createBrowserRouter(rotas);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='estoque-plus'>
      <Routes>
        {rotas.map(rota => (
          <Route key={rota.path} path={rota.path} element={rota.element} />
        ))}
      </Routes>
    </BrowserRouter>
    {/* <RouterProvider router={router} /> */}
  </StrictMode>
)
