import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import rotas from './rotas/rotas-modo-declarativo.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

// const router = createBrowserRouter(rotas);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter basename='/pages/Home'>
        <Routes>
          {rotas.map(rota => (
            <Route key={rota.path} path={rota.path} element={rota.element} />
          ))}
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </AuthProvider>
  </StrictMode>
)
