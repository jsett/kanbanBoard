import { useRecoilState } from "recoil"
import { currentUserState } from "./state/atoms"
import Link from "next/link";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/data";

export default function SideBar({children, users}){
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const user = users[currentUser];

    const bookmarks = user.bookmark.map((bookmark) => {
        return <li key={`bookmark-${bookmark.board.id}`}><Link className="link" href={`/board/${bookmark.board.id}`}>{bookmark.board.boardName}</Link></li>
    })
    const ownedBoard = user.boards.map((board) => {
        return <li key={`board-${board.id}`}><Link className="link" href={`/board/${board.id}`}>{board.boardName}</Link></li>
    })

    return <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {children}
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-44 p-4">
                <li className="font-bold">Bookmarks</li>
                {bookmarks}
                <li className="font-bold">My Boards</li>
                {ownedBoard}
            </ul>
        </div>
    </div>
}