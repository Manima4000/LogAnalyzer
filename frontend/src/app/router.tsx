import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/auth/pages/Dashboard';

export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                {/* Add more routes as needed */}
            </Routes>
        </BrowserRouter>
    )
}