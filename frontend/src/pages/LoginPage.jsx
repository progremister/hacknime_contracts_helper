import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google_logo.png';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            localStorage.setItem('email', email);
            navigate('/search');
        } catch (err) {
            alert('Invalid email or password');
        }
    };

    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME} | Login`;
    }, []);

    return (
        <div className='h-screen w-screen flex items-center justify-center absolute z-50 px-4 bg-blue-50'>
            <div className='max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-2 flex flex-col justify-center'>
                <div
                    className='flex items-center gap-2 hover:cursor-pointer text-2xl sm:text-4xl font-bold text-center text-gray-700 m-auto'
                >
                    <img src='./assets/logo.png' alt='logo' className='w-16' />
                    <div className='font-bold'>Podklady.sk</div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className='mt-10'>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email'
                            name='email'
                            type='text'
                            autoComplete='email'
                            required
                            placeholder='Váš email'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Heslo
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='current-password'
                            required
                            placeholder='Vaše heslo'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                    >
                        Prihlásiť sa
                    </button>
                </form>
                <p className='text-gray-700 text-center pt-4 text-sm sm:text-base'>
                    Nemáte ešte konto?{' '}
                    <Link to='/register' className='underline font-bold'>
                        Prihlasiť sa
                    </Link>
                </p>
                <button
                    type='submit'
                    className='w-full bg-blue-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900 flex items-center justify-center gap-4 duration-100 mt-3'
                >
                    <img src={googleIcon} alt='' className='max-w-5 max-h-5' />
                    <span>Prihlasenie s Google</span>
                    </button>
            </div>
        </div>
    );
}

export default LoginPage;
