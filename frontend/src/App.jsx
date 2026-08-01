import './index.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Protected from './context/Protected'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<SignUp />} />

        // Protected Routes
        <Route path='/sidebar' element={<Protected> <Sidebar /> </Protected>} />
      </Routes>

    </>
  )
}

export default App
