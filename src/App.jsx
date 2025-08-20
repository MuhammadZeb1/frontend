import { Routes, Route } from 'react-router-dom'
import routes from "./routes/routes.jsx"
import Header from './components/Header.jsx';

function App() {
  return (
    <>
      {/* Header should be outside Routes */}
      <Header />  

      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </>
  )
}

export default App
