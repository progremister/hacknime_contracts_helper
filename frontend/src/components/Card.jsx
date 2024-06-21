import { useNavigate } from 'react-router-dom';

const Card = ({ image, name, rating }) => {
    const navigate = useNavigate();

    const stars = Array.from({ length: Math.floor(rating) }).fill(null); // Create an array of stars based on the integer part of rating

    return (
        <div className='bg-white shadow-md rounded-lg overflow-hidden max-w-96 w-full'>
            <img src={image} alt={name} className='w-full h-40 object-cover object-center' />
            <div className='p-4'>
                <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
                <div className='flex items-center mt-1'>
                    <span className='text-yellow-500 flex'>
                        {stars.map((_, index) => (
                            <svg
                                key={index}
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 fill-current'
                                viewBox='0 0 20 20'
                            >
                                <path d='M10 1l2.6 5.9H18l-4.5 3.7 1.7 6-4.9-3.7-4.9 3.7 1.7-6L2 6.9h5.4L10 1z' />
                            </svg>
                        ))}
                    </span>
                    <span className='text-gray-600 ml-2'>{rating.toFixed(1)}</span>
                </div>
                <button
                    className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                    onClick={() => navigate('/generator')}
                >
                    Check
                </button>
            </div>
        </div>
    );
};
export default Card;
