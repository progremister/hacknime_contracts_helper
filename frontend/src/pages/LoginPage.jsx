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
                    <img src="./assets/logo.png" alt="logo" className='w-16'/>
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
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black'
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
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:border-black'
                    >
                        Prihlásiť sa
                    </button>
                </form>
                <p className='text-gray-700 text-center pt-4 text-sm sm:text-base'>
                    Nemáte ešte konto?{' '}
                    <Link to='/register' className='underline font-bold'>
                        Zaregistrovať sa
                    </Link>
                </p>
                <a
                        type='button'
                        className='w-full bg-blue-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900 flex items-center justify-center gap-6 duration-100 mt-3'
                        href="https://prihlasenie.slovensko.sk/oamfed/idp/samlv20?SAMLRequest=fZJPb%2BIwEMW%2FSuQLp8RpqKrKIiB2ESwtAbSEtrs3bzKAVf9JPU5S%2BulrApW6F64z82be72kGo3clgwYsCqPT3k0U9wLQhSmF3qe9bT4N73uj4QC5khUb1%2B6gf8NbDegCr9PIukZKaquZ4SiQaa4AmSvYZpwtWBLFrLLGmcJIcpG8o0jJwbmKUdq2bdT2I2P3NInjG%2FqSLTbFARQPhUbHdQEkmE9SIspwNZvOHwr5p%2F3Yl4vdW7bKpo9GhWq2PKoZL7PqYbN9WZbPJHi60BB%2F3csRa5h325wvxcltGN%2BFSZLH96zfZ%2F3bvySYeCChuetUJ2vovVVWHCRH0AIilKYBja8mwldquNpBSUVZ0RN%2Bk%2Fgr6wvkD6G76K4m8u88hOxXnq%2FD9WqTk3PErDNrv2V7fRFHBHtyTYKpsYq76%2BOnik9y140y0E64Ixl%2B8XIV1Y2J9qa5QFJPOaDffH39wdLvmU%2FWRoriGIylNO1PC9xBSpytgdDhWfX%2Fwww%2FAQ%3D%3D&RelayState=id-yIgND6wqZnvAjkMkN6LHhDtW5R5SYC-25bJOnAk5&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=cA8j5b3SPD1FdRfA%2BepyPeymKyFEiTCa2j1GJ5hsmE%2B73bpZYcTVPwG%2Bj9N%2FxF3D9lIGDurtOXYly01oj5hHHCxAW%2B%2FCK6r7l0macmVAIxu16TAqWKS5yASjxaPdY8OMkxnC4a%2FHFD3DPIZCZbzrZ5GhLJuGIaTHlg6mQiQsKci4KgXUBFoVU58wgcfkVkwm%2BY%2B5nOp6oh5OVQqAijpFdWBHGjex8WaDTrTX%2BkJDWYtrgBvoNv7EPi%2F8%2Fr1fqW%2FzqBMhOLGUc0vgy3b1fBsyZYkBYBhtcl0Per1oanVXAF9xDVbpyqDO2CDFBUVG6ytVc0nZJHWNbxvCOhiucVhuaw%3D%3D"
                    >
                        <img src="./assets/slovakia.png" alt="evo" className='h-8'/>
                        <span>Prihlasenie s IS EVO</span>
                    </a>
        </div>
        </div>
    );
}

export default LoginPage;
