import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useRecoilState } from 'recoil';
import { taskByIDQuery } from './state/atoms';
import Markdown from 'react-markdown';
import MDViewer from './mdViewer';
import DeleteTask from './deleteTask';
import { EditTaskAction } from '@/app/actions/editTaskAction';


export function TaskComponent(props) {
    // const task = props.task
    const [task, setTask] = useRecoilState(taskByIDQuery(props.task.id))
    const [editable, setEditable] = useState(false);
    const [markdown, setMarkdown] = useState('');
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({
        id: props.id,
        disabled: editable
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const finishEdit = function(){
        if (editable){
            document.getElementById("textEditorForm").requestSubmit();
            setTask({text: markdown})
        }
    }

    const textEditer = <form id="textEditorForm" action={ async (formData: formData) => {
        await EditTaskAction(formData)
    } }>
        <input name="taskId" type="hidden" value={task.id} />
        <input name="state" type="hidden" value={task.state} />
        <textarea name="text" className="textarea textarea-bordered w-full h-full resize-y" defaultValue={task.text} onChange={e => setMarkdown(e.target.value)} ></textarea> 
        <input name="assignedUser" type="hidden" value={task.userId} />
        <input name="boardId" type="hidden" value={task.boardId} />
    </form>

    if (task.hasOwnProperty("text")) {
        const editbox = editable ? 
            textEditer
            : <MDViewer text={task.text} />;   
    
        return (
            <div ref={setNodeRef} style={style}  {...attributes} className="w-full rounded-md">
                <div className="m-2 bg-base-100 border-2 border-primary shadow-md rounded-md">
                    <div className="rounded-t-md">
                        <div className="flex flex-row justify-end bg-primary-content text-primary rounded-t-md p-1">
                            <div className="tooltip" data-tip="Edit" onClick={() => { finishEdit(); setEditable((val) => !val ); }}>
                                { editable ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-success'><path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z"/></svg>
                                     : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-base-content'><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>}
                            </div>
                            <DeleteTask boardID={task.boardID} taskID={task.id} />
                            <div ref={setActivatorNodeRef} {...listeners} className="text-m font-thin text-nowrap truncate grow ml-1 mr-1 text-end">{task.user.name}</div>
                            <div className="avatar tooltip" data-tip="assigned user">
                                <div className="w-5 rounded">
                                    <img
                                        src={task.user.image}
                                        alt="Tailwind-CSS-Avatar-component" />
                                </div>
                            </div>
                        </div>
    
                    </div>
                    <div ref={setActivatorNodeRef} {...listeners} className="flex flex-col justify-end rounded-md">
                        <div className="grow h-32 m-2 overflow-y-auto" >
                            {editbox}
                        </div>
    
                    </div>
                </div>
            </div>
        );
    } else {
        return <div className="text-nowrap overflow-auto">none</div>
    }

}