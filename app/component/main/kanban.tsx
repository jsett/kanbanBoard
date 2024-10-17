import { useRecoilState } from "recoil";
import { boardState, textState } from "./state/atoms";

import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { TaskComponent } from "./task";

import Tasks from "./tasks";
import AddTask from "./addTask";

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
        return <div key={`boardstates-${stateName}`} className="h-full flex flex-col justify-between border-secondary-content border-4 rounded-lg">
                <div className=" rounded-t-md text-center font-bold text-lg bg-secondary-content text-secondary">
                    {stateName}
                </div>
                <div className=" bg-base-100 grow">
                    <Droppable key={`drop-${stateName}`} id={`${stateName}`}>
                        <Tasks state={stateName} />
                        <AddTask boardID={myboard.id} state={stateName} />
                    </Droppable>
                </div>
            </div>
    })

    return <>
        {/* {JSON.stringify(myboard)} */}
        <div className=" w-full h-full">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-4 gap-2 p-2 bg-neutral-content h-full">
                    {boardMapping}
                </div>
            </DndContext>
        </div>
    </>
}