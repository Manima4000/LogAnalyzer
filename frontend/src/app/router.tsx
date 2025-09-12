import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../features/auth/pages/Login';

export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                {/* Add more routes as needed */}
            </Routes>
        </BrowserRouter>
    )
}