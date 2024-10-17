'use client';
import NavBar from "../main/navbar";
import { RecoilRoot } from "recoil";
import ThemeComponent from "../main/theme";
import Link from "next/link";

export default function ProfileApp({user, users}){
    const bookmarks = user.bookmark.map((bookmark) => {
        return <li key={`bookmark-${bookmark.board.id}`}><Link className="link link-secondary" href={`/board/${bookmark.board.id}`}>{bookmark.board.boardName}</Link></li>
    })
    const ownedBoard = user.boards.map((board) => {
        return <li key={`board-${board.id}`}><Link className="link link-secondary" href={`/board/${board.id}`}>{board.boardName}</Link></li>
    })

    return <>
        <RecoilRoot>
            <ThemeComponent>
                <NavBar users={users}/>
                <div className="w-screen h-screen bg-base-100 flex flex-row justify-center items-center">
                    <div className="w-[75%] h-[75%] rounded-xl p-2 border-2 border-secondary-content shadow-2xl bg-base-100 flex flex-col justify-start">
                        <div className="w-full flex flex-row flex-wrap justify-center items-center">

                            <div className="avatar">
                                <div className="w-24 rounded-xl">
                                    <img src={user.image} />
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold m-5">
                                {user.name}
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-around">
                            <div>
                                <div className="text-2xl font-extrabold m-5">Bookmarks</div>
                                <ul className="ml-5">
                                    {bookmarks}
                                </ul>
                            </div>
                            <div>
                                <div className="text-2xl font-extrabold m-5">Owned Boards</div>
                                <ul className="ml-5">
                                    {ownedBoard}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeComponent>
        </RecoilRoot>
    </>
}