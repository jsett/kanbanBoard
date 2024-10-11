import { User } from "@prisma/client";
import { useRecoilState } from "recoil";
import { currentUserState } from "./state/atoms";
import ThemeChooser from "./themeChooser";

export default function NavBar({users}: {users: User[]}) {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    
    const myuser = users[currentUser];

    const userList = users.map((user) => {
        return <option key={`userOp-user.id`} value={user.id}>{user.name}</option>
    })

    return <div className="navbar bg-base-300">
        <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
            </label>
        </div>
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Kanban</a>
        </div>
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="profile photo"
                        src={myuser.image} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li className="font-bold">
                    {myuser.name}
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
                <li>
                    <select className="select select-bordered w-full" onChange={(e) => setCurrentUser(e.target.value)}  >
                        <option disabled selected>Current User</option>
                        {userList}
                    </select>
                </li>
                <li>
                    <ThemeChooser />
                </li>
                
            </ul>
        </div>
    </div>
}