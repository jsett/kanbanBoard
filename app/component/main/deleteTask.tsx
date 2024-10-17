import { deleteTaskAction } from "@/app/actions/deleteTaskAction"
import { useRecoilState } from "recoil"

export default function DeleteTask({ taskID, boardID }){



    return <>
        <div onClick={() => document.getElementById(`delete_modal_${taskID}`).showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="inline-block h-7 w-7 stroke-current" ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </div>
        <dialog id={`delete_modal_${taskID}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">Are you sure you want to delete this task?</h3>
                <form id={`delete_${taskID}`} action={deleteTaskAction}>
                    <input type="hidden" name="id" value={taskID}/>
                    <input type="hidden" name="boardID" value={boardID}/>
                </form>
                <div className="modal-action justify-center">
                    <form method="dialog">
                        <button className="btn mr-2" onClick={() => document.getElementById(`delete_${taskID}`).requestSubmit()}>Yes</button>
                        <button className="btn">No</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
}