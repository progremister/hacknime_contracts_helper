import { PopupMenu } from "react-simple-widgets";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function ProfileDropdown() {
  const navigate = useNavigate();

  return (
    <div id="app" className="border-3rounded-md p-5">
      <div className="">
        <PopupMenu>
          <button className="flex justify-normal items-center">
            <div
              id="circle-avatar"
              className="text-center mx-auto grid w-14 h-14 rounded-full bg-blue-800 place-items-center"
            >
              <span className="text-4xl font-bold">T</span>
            </div>
          </button>

          <div className="card text-start bg-gray-100 w-64 rounded-lg shadow-md text-blue-950 text-[20px]">
            <div className="card-body p-4">
              <div
                id="circle-avatar"
                className="text-center mx-auto mb-4 grid w-24 h-24 rounded-full bg-blue-800 place-items-center text-white"
              >
                <span className="text-6xl font-bold">T</span>
              </div>

              <h5 className="text-center mb-0">Test User</h5>
              <p className="text-center mb-2 text-sm text-gray-400">tu@gmail.com</p>

              <hr />

              <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

              <div className="fllex flex-col align-middle text-center w-full">
                <button className="px-4 flex justify-around items-center gap-3 mx-auto text-md w-full my-2">
                  <FontAwesomeIcon icon={faUser} />
                  <small className="w-2/3 text-left">Profil</small>
                </button>
                <button className="px-4 flex justify-around items-center gap-3 mx-auto text-md w-full my-2">
                  <FontAwesomeIcon icon={faGears} />
                  <small className="w-2/3 text-left">Nastavenia</small>
                </button>
              </div>

              <hr style={{ margin: "0 -24px 24px" }} />

              <div className="flex justify-between px-4 items-center gap-3 mx-auto text-md w-full" onClick={() => navigate('/register', { replace: true })}>
                <button className="flex justify-around items-center gap-3 mx-auto text-md w-full text-red-500">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <small className="w-2/3 text-left">Odhlásiť sa</small>
                </button>
              </div>
            </div>
          </div>
        </PopupMenu>
      </div>
    </div>
  );
}
