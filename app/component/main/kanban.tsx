import { useRecoilState } from "recoil";
import { boardState, textState } from "./state/atoms";

import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

function Tasks({ state, board }: { state: string, board: Board }) {
    const myState = state;
    if (board.hasOwnProperty("tasks")) {

        const taskList = board.tasks.filter((task: Tasks) => {
            return task.state == myState
        }).map((task: Tasks) => {
            return <Draggable id={`${task.id}`}><div className="m-2 bg-slate-100">
                <div className="flex flex-col justify-end">
                    <div className="grow">
                        {task.text}
                    </div>
                    <div className="bg-slate-500">
                        <div className="flex flex-row">
                            <div className="text-m font-thin text-nowrap truncate grow ml-1 mr-1">{task.user.name}</div>
                            <div className="avatar">
                            <div className="w-5 rounded">
                                <img
                                    src={task.user.image}
                                    alt="Tailwind-CSS-Avatar-component" />
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </Draggable>
        })
        return <>{taskList}</>
    } else {
        return <>
            Nothing here
        </>
    }

}


export default function Kanban({ board }: { board: Board }) {
    const [rBoard, setBoard] = useRecoilState(boardState);
    const myboard = rBoard ? rBoard : board
    const myStates = JSON.parse(board.states)

    useEffect(() => {
        if (rBoard.hasOwnProperty("tasks")) {
            console.log("doing nothing")
        } else {
            setBoard(board)
        }
    }, [rBoard, setBoard, board])


    function handleDragEnd(event) {
        const { over, active } = event;
        console.log(event);
        if (over != null) {
            setBoard((val) => {
                const itemIndex = val.tasks.findIndex((x) => x.id == active.id)
                const item = { ...val.tasks[itemIndex], state: over.id }
                const item_list = [...val.tasks.slice(0, itemIndex), item, ...val.tasks.slice(itemIndex + 1)]
                const res = { ...val, tasks: item_list }
                console.log(res)
                return res
            })
        }
    }

    const boardMapping = myStates.map((stateName: string) => {
        return <div className="bg-blue-300">
            <div className="h-full bg-green-200 flex flex-col justify-between">
                <div className="w-32 bg-orange-200">
                    {stateName}
                </div>
                <div className="w-32 bg-orange-300 grow">
                    <Droppable key={`drop-${stateName}`} id={`${stateName}`}>
                        <Tasks state={stateName} board={myboard} />
                    </Droppable>
                </div>
                <div className="w-32 bg-orange-200">
                    tail
                </div>
            </div>
        </div>
    })

    return <>
        {/* {JSON.stringify(myboard)} */}
        <div className=" w-full grow h-full">
            <div className="flex flex-row bg-blue-200 w-full h-full justify-around">
                <DndContext onDragEnd={handleDragEnd}>
                    {boardMapping}
                </DndContext>
            </div>
        </div>
    </>
}