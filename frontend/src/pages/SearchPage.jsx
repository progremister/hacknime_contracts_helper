import { useState } from 'react';
import { useEffect } from 'react';
import { $api } from '../api/api';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME} | Search Templates`;
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await $api.get(`/api/templates?search=${query}`);
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch templates. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center p-4 bg-gray-100'>
            <div className='max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-md mt-2'>
                <h1 className='text-2xl sm:text-4xl font-bold text-center text-gray-700'>
                    Search Templates
                </h1>
                <form onSubmit={handleSearch} className='mt-10'>
                    <div className='mb-4'>
                        <label htmlFor='search' className='block text-gray-700 font-semibold mb-2'>
                            Search
                        </label>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            id='search'
                            name='search'
                            type='text'
                            placeholder='Enter search query'
                            className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                    >
                        Search
                    </button>
                </form>
                {loading && <p className='mt-4 text-center text-gray-600'>Loading...</p>}
                {error && <p className='mt-4 text-center text-red-600'>{error}</p>}
                <div className='mt-8'>
                    {results.length > 0 ? (
                        <ul>
                            {results.map((template) => (
                                <li key={template.id} className='border-b border-gray-200 py-4'>
                                    <h2 className='text-xl font-semibold text-gray-800'>
                                        {template.name}
                                    </h2>
                                    <p className='text-gray-600'>{template.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !loading && <p className='text-center text-gray-600'>No templates found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
