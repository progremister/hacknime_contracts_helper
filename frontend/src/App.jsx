import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import DocumentPage from './pages/DocumentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Generator from './pages/Generator';

const App = () => {
    return (
        <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='/generator' element={<Generator />} />
            <Route path='/' element={<Layout />}>
                <Route index element={<DocumentPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;

function Layout() {
    return localStorage.getItem('email') ? <Outlet /> : <Navigate to='/login' />;
}

function NotFoundPage() {
    return (
        <div className='h-screen w-screen flex items-center justify-center absolute z-50 px-4 bg-blue-50'>
            <div className='max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-md mt-2'>
                <h1 className='text-2xl sm:text-4xl font-bold text-center text-gray-700'>
                    Page not found
                </h1>
            </div>
        </div>
    );
}
