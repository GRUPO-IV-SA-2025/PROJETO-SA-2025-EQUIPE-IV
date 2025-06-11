
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home/Home'


function App() {

  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}

export default App
