import { PopupMenu } from "react-simple-widgets";

export default function ProfileDropdown() {
  return (
    <div id="app" className="border-3rounded-md p-5">
      <div className="">
        <PopupMenu>
          <button className="btn btn-primary">
            <div
                    id="circle-avatar"
                    className="text-center mx-auto mb-4 grid w-16 h-16 rounded-full bg-blue-600 place-items-center"
                >
                    <span className="text-4xl font-bold">T</span>
            </div>
          </button>

          <div className="card text-start bg-gray-100 w-64 rounded-lg shadow-md text-blue-950">
            <div className="card-body p-4">
              <div
                id="circle-avatar"
                className="text-center mx-auto mb-4 grid w-24 h-24 rounded-full bg-blue-600 place-items-center text-white"
              >
                <span className="text-6xl font-bold">T</span>
              </div>

              <h5 className="text-center mb-0">Test User</h5>
              <p className="text-center mb-2 text-sm text-gray-400">tu@gmail.com</p>

              <hr />

              <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

              <div className="fllex flex-col align-middle text-center">
                <button className="px-4">
                  <small>Profile</small>
                </button>
                <button className="list-group-item list-group-item-action px-4">
                  <small>Settings</small>
                </button>
              </div>

              <hr style={{ margin: "0 -24px 24px" }} />

              <div className="flex justify-center z-50" onClick={() => navigate("/register")}>
                <button className="btn btn-secondary">
                  <small className="text-center text-red-500" >Logout</small>
                </button>
              </div>
            </div>
          </div>
        </PopupMenu>
      </div>
    </div>
  );
}
