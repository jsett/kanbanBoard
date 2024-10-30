import { bookmarkBoardAction } from "@/app/actions/bookmarkBoardAction";
import { updateBoardNameAction } from "@/app/actions/updateBoardNameAction";
import { boardNameAtom, currentUserAtom } from "@/store/data";
import { User } from "@prisma/client";
import { useAtom } from "jotai";


export default function BoardTitle({boardId, users}){
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const userId = users[currentUser].id
    const bookmarks = users[currentUser].bookmark.map((val) => val.boardId )

    const [boardName, setBoardName] = useAtom(boardNameAtom);

    const updateBoardName = (e) => {
        const text = e.currentTarget.innerText
        const formData = new FormData();
        
        formData.append("boardId", boardId);
        formData.append("boardName", text);

        updateBoardNameAction(formData)
    }

    const updateBookmark = () => {
        const formData = new FormData();
        
        formData.append("boardId", boardId);
        formData.append("userId", userId);
        bookmarkBoardAction(formData)
    }
    
    const bookmarked= bookmarks.includes(boardId)

    const bookmarkStar = bookmarked ? <svg onClick={updateBookmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 ml-2 stroke-secondary fill-foreground"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg> :
                                      <svg onClick={updateBookmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 ml-2 stroke-secondary fill-foreground"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
    return <div className="w-full flex flex-row justify-center items-center bg-neutral-content">
        <div className="font-bold text-5xl  text-secondary" contentEditable="true" onBlur={updateBoardName}>{boardName}</div>
        {bookmarkStar}
        </div>
}