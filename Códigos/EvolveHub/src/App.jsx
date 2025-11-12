import { BrowserRouter, Routes, Route } from 'react-router-dom' // Remove 'Link' e 'Container' se não estiverem a ser usados diretamente aqui
import { Container } from 'react-bootstrap' // Certifica-te que está importado, pois usas <Container>

// Importa as tuas páginas
import Dashboard from './pages/Dashboard'
import Trilha from './pages/Trilha'
import LabIA from './pages/LabIA'
import Admin from './pages/Admin'

// Importa o teu componente de Navegação
import AppNavbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Container className="mt-4"> {/* <Container> é do React-Bootstrap, precisa de ser importado */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="/lab-ia" element={<LabIA />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App