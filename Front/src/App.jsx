import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/appRouter'
import Footer from './components/Layout/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal con Flexbox */}
      <div className="flex flex-col min-h-screen">
        <h1 className="text-3xl font-bold p-10 text-black">¡Probando React!</h1>
        {/* El contenido principal crece para empujar al footer */}
        <main className="flex-grow">
          <AppRouter />
        </main>

        {/* El Footer siempre al final */}
      <Footer />
      </div>
      
    </BrowserRouter>
  )
}

export default App