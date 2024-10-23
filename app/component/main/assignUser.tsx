import { useRef } from "react"
import { UserAutoCompleate } from "../userAutoCompleate"

export function AssignUser({ task, setTask }) {
    const modalRef = useRef(null);
    const formRef = useRef(null);
    const submitForm = () => {
        const formData = new FormData(formRef.current);

        fetch('/api/tasks/update', {
            method: 'post',
            body: formData,
        }).then((res) => {
            res.json().then((ret) => {
                setTask((pre) => ({...pre, ...ret}))
            });
        });
    }

    return <>
        <div className="text-m font-thin text-nowrap truncate ml-1 mr-1 text-end" onClick={() => modalRef.current.showModal()}>{task.user.name}</div>
        <div className="avatar tooltip" data-tip="assigned user" onClick={() => modalRef.current.showModal()}>
            <div className="w-5 rounded">
                <img
                    src={task.user.image}
                    alt="Tailwind-CSS-Avatar-component" />
            </div>
        </div>

        <dialog ref={modalRef} id={`assignUser_modal_${task.id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Assign User</h3>
                <form ref={formRef} id={`assignUser_${task.id}`}>
                    <input type="hidden" name="taskId" value={task.id}/>
                    <input type="hidden" name="state" value={task.state}/>
                    <input type="hidden" name="text" value={task.text}/>
                    <input type="hidden" name="boardId" value={task.boardId}/>
                    <UserAutoCompleate />
                </form>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn mr-2" onClick={submitForm}>Submit</button>
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
}