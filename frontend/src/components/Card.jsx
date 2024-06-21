import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const Card = ({ image, name, rating, usages, comments: initialComments }) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState(initialComments);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const stars = Array.from({ length: Math.floor(rating) }).fill(null);

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { username: 'New User', text: newComment }]);
            setNewComment('');
        }
    };

    return (
        <div className='bg-white shadow-md rounded-lg overflow-hidden max-w-96 w-full'>
            <img src={image} alt={name} className='w-full h-40 object-cover object-center' />
            <div className='p-4'>
                <h2
                    className='text-lg font-semibold text-gray-800 hover:underline cursor-pointer'
                    onClick={() => navigate('/generator')}
                >
                    {name}
                </h2>
                <div className='flex justify-between'>
                    <div className='flex items-center mt-1'>
                        <span className='text-gray-600 mr-2'>{rating}</span>
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
                    </div>
                    <div className='flex align-top gap-2 text-gray-700'>
                        <FontAwesomeIcon icon={faFileArrowDown} />
                        {usages}
                    </div>
                </div>
                <button
                    className='w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                    onClick={() => setShowComments(!showComments)}
                >
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
                {showComments && (
                    <div className='mt-4'>
                        <div>
                            {comments.map((comment, index) => (
                                <div key={index} className='mb-2'>
                                    <span className='font-bold'>{comment.username}:</span> {comment.text}
                                </div>
                            ))}
                        </div>
                        <div className='mt-4'>
                            <input
                                type='text'
                                placeholder='Add a comment...'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                            />
                            <button
                                className='w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'
                                onClick={handleAddComment}
                            >
                                Submit Comment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
