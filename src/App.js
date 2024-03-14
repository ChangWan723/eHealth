import {Login} from "./components/Login";
import {Routes, Route} from 'react-router-dom'
import {Register} from "./components/Register";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    )
}

export default App
