import React, { useState, useEffect, Suspense } from 'react';
import { Droppable } from "./Droppable";
import {Tasks} from "./tasks";
import { useAtom } from "jotai";


export function StateColumn({stateAtom, boardId}){
    const [state, setState] = useAtom(stateAtom);
    
    return <div key={`boardstates-${state}`} className="h-full flex flex-col justify-between border-secondary-content border-4 rounded-lg">
            <div className=" rounded-t-md text-center font-bold text-lg bg-secondary-content text-secondary">
                {state}
            </div>
            <div className=" bg-base-100 grow">
                <Droppable key={`drop-${state}`} id={`${state}`}>
                    <Tasks state={state} />
                    {/* <AddTask boardID={boardId} state={state} /> */}
                </Droppable>
            </div>
        </div>
}