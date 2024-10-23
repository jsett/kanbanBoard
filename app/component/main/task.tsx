import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import MDViewer from './mdViewer';
import DeleteTask from './deleteTask';
import { EditTaskAction } from '@/app/actions/editTaskAction';
import { useAtom } from "jotai";
import { EditButton } from './editButton';
import { EditBox } from './editBox';

export function TaskComponent({taskAtom, stateName}) {
    const [task, setTask] = useAtom(taskAtom);
    const [editable, setEditable] = useState(false);
    const [markdown, setMarkdown] = useState('');
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({
        id: `${stateName}-${task.id}`,
        data: {updater: (newstate: string) => setTask((pre) => ({...pre, state: newstate})) },
        disabled: editable
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    

    if (task.hasOwnProperty("text") && task.state == stateName) {
        return (
            <div ref={setNodeRef} style={style}  {...attributes} className="w-full rounded-md">
                <div className="m-2 bg-base-100 border-2 border-primary shadow-md rounded-md">
                    <div className="rounded-t-md">
                        <div className="flex flex-row justify-end bg-primary-content text-primary rounded-t-md p-1">
                            <EditButton editable={editable} setTask={setTask} setEditable={setEditable} markdown={markdown} />
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
                        <EditBox task={task} editable={editable} setMarkdown={setMarkdown} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>
    }
}