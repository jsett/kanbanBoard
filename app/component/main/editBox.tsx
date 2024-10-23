import MDViewer from "./mdViewer";
import { EditTaskAction } from "@/app/actions/editTaskAction";
import { useState } from "react";

export function EditBox({ editable, task, setMarkdown }) {

    const textEditer = <form id="textEditorForm" action={async (formData: formData) => {
        await EditTaskAction(formData)
    }}>
        <input name="taskId" type="hidden" value={task.id} />
        <input name="state" type="hidden" value={task.state} />
        <textarea name="text" className="textarea textarea-bordered w-full h-full resize-y" defaultValue={task.text} onChange={e => setMarkdown(e.target.value)} ></textarea>
        <input name="assignedUser" type="hidden" value={task.userId} />
        <input name="boardId" type="hidden" value={task.boardId} />
    </form>

    const editbox = editable ?
        textEditer
        : <MDViewer text={task.text} />;

    return <div className="grow h-32 m-2 overflow-y-auto" >
        {editbox}
    </div>
}