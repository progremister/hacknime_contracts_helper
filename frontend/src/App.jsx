import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import Generator from './pages/Generator';

const App = () => {
    useEffect(() => {
        localStorage.setItem('email', 'value');
    }, []);

    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/' element={<Layout />}>
                <Route path='/generator' element={<Generator />} />
                {/* <Route index element={<DocumentPage />} /> */}
                <Route path='/search' element={<SearchPage />} />
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
