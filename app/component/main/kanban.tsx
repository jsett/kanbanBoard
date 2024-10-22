import React, { useState, useEffect, Suspense } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { TaskComponent } from "./task";

import Tasks from "./tasks";
import AddTask from "./addTask";
import { useHydrateAtoms } from "jotai/utils";
import { BoardStoreData, boardAtom, statesAtomsAtom } from "@/store/data";
import { useAtom } from "jotai";
import { BoardData } from "./app";
import { SetStateAction } from "jotai/vanilla";

export function StateColumn({stateAtom, boardId}){
    const [state, setState] = useAtom(stateAtom);
    
    return <div key={`boardstates-${state}`} className="h-full flex flex-col justify-between border-secondary-content border-4 rounded-lg">
            <div className=" rounded-t-md text-center font-bold text-lg bg-secondary-content text-secondary">
                {state}
            </div>
            <div className=" bg-base-100 grow">
                Task
                <Droppable key={`drop-${state}`} id={`${state}`}>
                    {/* <Tasks state={state} /> */}
                    {/* <AddTask boardID={boardId} state={state} /> */}
                </Droppable>
            </div>
        </div>
}

export default function Kanban({ board }: { board: BoardData }) {
    useHydrateAtoms([[boardAtom, board]])

    //const [myboard, setMyboard]: [BoardStoreData, SetStateAction<BoardStoreData>] = useAtom(boardAtom)
    const [myboard, setMyboard] = useAtom(boardAtom)
    const [statesAtoms] = useAtom(statesAtomsAtom);

    const boardMapping = myboard ? statesAtoms.map((stateAtom) => <StateColumn boardId={myboard.id} stateAtom={stateAtom} />) : <div>Loading</div>;

    
    // const [rBoard, setBoard] = useRecoilState(boardState);
    // const myboard = rBoard ? rBoard : board
    // const myStates = JSON.parse(board.states)

    // useEffect(() => {
    //     if (rBoard.hasOwnProperty("tasks")) {
    //         console.log("doing nothing")
    //     } else {
    //         setBoard(board)
    //     }
    // }, [rBoard, setBoard, board])


    function handleDragEnd(event) {
        const { over, active } = event;
        console.log(event);
        // if (over != null) {
        //     setBoard((val) => {
        //         const itemIndex = val.tasks.findIndex((x) => x.id == active.id)
        //         const item = { ...val.tasks[itemIndex], state: over.id }
        //         const item_list = [...val.tasks.slice(0, itemIndex), item, ...val.tasks.slice(itemIndex + 1)]
        //         const res = { ...val, tasks: item_list }
        //         console.log(res)
        //         return res
        //     })
        // }
    }

    

    return <>
        <div className=" w-full h-full">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-4 gap-2 p-2 bg-neutral-content h-full">
                    {/* {JSON.stringify(myboard)} */}
                    {boardMapping}
                </div>
            </DndContext>
        </div>
    </>
}