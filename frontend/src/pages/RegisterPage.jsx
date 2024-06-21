import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google_logo.png';

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: '',
        organisation: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = userData;

        if (!email.trim() || !password.trim()) {
            alert('Invalid email or password');
            return;
        }

        try {
            localStorage.setItem('email', email); // Adjust as needed
            navigate('/search'); // Redirect after successful registration
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME} | Register`;
    }, []);

    return (
        <div className='h-screen flex items-center px-4 bg-blue-50'>
            <div className='max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-md mt-2'>
                <h1 className='text-2xl sm:text-4xl font-bold text-center text-gray-700'>
                    Register for an account
                </h1>
                <form onSubmit={handleSubmit} className='mt-10'>
                    <div className='mb-4'>
                        <label
                            htmlFor='fullName'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Full Name
                        </label>
                        <input
                            value={userData.fullName}
                            onChange={handleChange}
                            id='fullName'
                            name='fullName'
                            type='text'
                            autoComplete='name'
                            required
                            placeholder='Your full name'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
                            Email
                        </label>
                        <input
                            value={userData.email}
                            onChange={handleChange}
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            placeholder='Your email address'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Password
                        </label>
                        <input
                            value={userData.password}
                            onChange={handleChange}
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='new-password'
                            required
                            placeholder='Your password'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='organisation'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Organisation
                        </label>
                        <input
                            value={userData.organisation}
                            onChange={handleChange}
                            id='organisation'
                            name='organisation'
                            type='text'
                            autoComplete='organization'
                            required
                            placeholder='Your organisation'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                    >
                        Register
                    </button>
                    <button
                        type='submit'
                        className='w-full bg-purple-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 flex items-center justify-center gap-4 duration-100 mt-3'
                    >
                        <img src={googleIcon} alt='' className='max-w-5 max-h-5' />
                        <span>Create account with Google</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
