import { useRecoilState } from "recoil"
import { addTaskAction } from "@/app/actions/addTaskAction"
import { useAtom } from "jotai";
import { tasksAtom } from "@/store/data";


export default function AddTask({ boardID, state }){
    const [tasks, setTasks] = useAtom(tasksAtom);

    const submitForm = () => {
        const form = new FormData(document.getElementById(`create_${state}`));
        fetch('/api/tasks', {
            method: 'post',
            body: form,
        }).then((res) => {
            res.json().then((ret) => {
                setTasks((pre) => {
                    return [...pre, ret]
                })
            });
        });
    }

    return <>
        <div className="flex flex-row w-full justify-center" onClick={() => document.getElementById(`create_modal_${state}`).showModal()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="inline-block h-7 w-7 fill-base-content">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
        </div>
        <dialog id={`create_modal_${state}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add A Task</h3>
                <form id={`create_${state}`}>
                    <input type="hidden" name="state" value={state}/>
                    <input type="hidden" name="board" value={boardID}/>
                    <textarea name="text" className="textarea w-full textarea-bordered" placeholder="Task Description"></textarea>
                    <input name="assignedUser" type="text" placeholder="Assign To User ID" className="input input-bordered w-full" />
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