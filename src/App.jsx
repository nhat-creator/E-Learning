import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { renderRoutes } from './routes'

function App() {

  return (
   <div>
    <BrowserRouter>
    <Routes>
      {renderRoutes()}
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;
