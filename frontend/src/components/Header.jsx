import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

function Header() {
    const navigate = useNavigate();

  return (
    <div className='w-full px-4 py-[0.5rem] bg-blue-600 text-[2rem] text-white flex justify-between'>
      <div
        className='flex items-center gap-2 hover:cursor-pointer'
        onClick={() => navigate('/search', { replace: true })}
      >
        <img src="./assets/logo-2.png" alt="logo" className='w-16 h-16'/>
        <div className='font-bold'>Podklady.sk</div>
      </div>
      <ProfileDropdown />
    </div>
  );
}

export default Header;
