import {Login} from "./components/Login";
import {Routes, Route} from 'react-router-dom'
import {Register} from "./components/Register";
import {Home} from "./components/dashboard/Home";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
        </Routes>
    )
}

export default App
