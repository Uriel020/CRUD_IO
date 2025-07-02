import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FormsPage from './pages/FormsPage';
import EditFormPage from './pages/EditForm';
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={FormsPage} />
      <Route path='/edit' Component={EditFormPage} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
